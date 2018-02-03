import * as express from "express";
import { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import { setupEndpoints } from "./endpoint-setup";
import { Result } from "./result";
import { System } from "./system";
import { database } from "./database";

const app = express();

app.use(json());
app.get('/', (_, res) => res.json({yolo: "swag"}));

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

async function sendResponse(response: Response, resultPromise: Promise<Result<any, number>>) {
  let result = await resultPromise;
  if (result.isOk()) {
    return response.status(200).send();
  } else {
    return response.status(result.unwrapError()).send();
  }
}

system.endpoints.map((endpoint)=> {
  return {
    ...endpoint,
    handler: (request: Request, response: Response)=> {
      return sendResponse(response, endpoint.handler(request, system));
    }
  }
}).forEach((endpoint)=> {
  if (endpoint.method == "post") {
    return app.post(endpoint.path, endpoint.handler);
  } else if (endpoint.method == "get") {
    return app.get(endpoint.path, endpoint.handler);
  }
  throw "invalid method! " + endpoint.method;
});
let server = app.listen(3000, "localhost", () => console.log('Example app listening on port 3000!'));