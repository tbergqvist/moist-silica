import { database } from "./database";
import { Result } from "./result";
import { Request } from "express";
import { System } from "./system";
import { GameApi } from "../../shared/api";
import { HttpResponse } from "./http-response";

function createLinks(address: {address: string, port: number}) {
  return {
    logout: `http://${address.address}:${address.port}/logout`
  }
}

function isUndefinedOrNull(obj: any) {
  return obj === undefined || obj === null;
}

export async function registerRequestEndpoint(request: Request, system: System): Promise<Result<HttpResponse, number>> {
  let registerRequestData: GameApi.RegisterBody = request.body;

  if (isUndefinedOrNull(registerRequestData.password) || isUndefinedOrNull(registerRequestData.username)) {
    return Result.Error(400);
  }

  let accountId = await database.register(system.dbPool, registerRequestData);

  return accountId
    .mapError(()=>500)
    .map(()=> ({
      body: createLinks(system.address())
    }));
}

export async function loginRequestEndpoint(request: Request, system: System): Promise<Result<HttpResponse, number>> {
  let loginRequestData: GameApi.LoginBody = request.body;

  if (isUndefinedOrNull(loginRequestData.password) || isUndefinedOrNull(loginRequestData.username)) {
    return Result.Error(400);
  }

  let dbResponse = await database.getUser(system.dbPool, { username: loginRequestData.username });
  
  return dbResponse
    .mapError(()=>500)
    .andThen((user)=> {
      return user.filter(user => user.password === loginRequestData.password)
        .map(_ => ({
          cookie: "123"
        }))
      .okOr(401);
    });
}

export async function getGameStateEndpoint(_: Request, _2: System): Promise<Result<HttpResponse, number>> {
  return Result.Ok({});
}