import * as express from "express";
import * as cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";

import { json } from "body-parser";
import { setupEndpoints } from "./endpoint-setup";
import { Result } from "./result";
import { System, EndpointCommon } from "./system";
import { database } from "./database";
import { HttpResponse } from "./http-response";

const app = express();

app.use(cookieParser("hejhå"));
app.use(json());

function enableCors(_: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Headers", "Content-Type, Accept");
  next();
}

app.use(enableCors);

let dbPool = database.createDbPool();
let system: System = {
  dbPool: dbPool,
  address() {
    return server.address();
  },
  endpoints: setupEndpoints()
};

async function sendResponse(response: Response, resultPromise: Promise<Result<HttpResponse, number>>) {
  let result = await resultPromise;
  
  if (result.isOk()) {
    let httpResponse = result.unwrap();
    console.log("setting cookie", httpResponse);
    if (httpResponse.cookie) {
      response.cookie("testCookie", "yolo", {signed: true, httpOnly: true});
    }
    return response.status(httpResponse.statusCode || 200).send(httpResponse.body);
  } else {
    return response.status(result.unwrapError()).send();
  }
}

Object.keys(system.endpoints)
  .map(k => <EndpointCommon>(<any>system.endpoints)[k])
  .map((endpoint)=> ({
      ...endpoint,
      handler: (request: Request, response: Response)=> {
        if (endpoint.authenticationRequired) {
          let cookie = request.signedCookies["yolo"];
          console.log(cookie);
          //TODO: verify cookie correctly
          if (!cookie) {
            return response.status(401).send();
          }
        }
        return sendResponse(response, endpoint.handler(request, system));
      }
    }))
  .forEach((endpoint)=> {
    if (endpoint.method == "post") {
      return app.post(endpoint.path, endpoint.handler);
    } else if (endpoint.method == "get") {
      return app.get(endpoint.path, endpoint.handler);
    }
    throw "invalid method! " + endpoint.method;
  });
let server = app.listen(3000, "localhost", () => console.log('Example app listening on port 3000!'));