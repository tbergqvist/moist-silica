import { database } from "./database";
import { Result } from "./result";
import { Request } from "express";
import { System } from "./system";
import { API } from "../../shared/api";

function createLinks(address: {address: string, port: number}) {
  return {
    logout: `http://${address.address}:${address.port}/logout`
  }
}

function isUndefinedOrNull(obj: any) {
  return obj === undefined || obj === null;
}

export async function registerRequestEndpoint(request: Request, system: System): Promise<Result<any, number>> {
  let registerRequestData: API.RegisterBody = request.body;

  if (isUndefinedOrNull(registerRequestData.password) || isUndefinedOrNull(registerRequestData.username)) {
    return Result.Error(400);
  }

  let accountId = await database.register(system.dbPool, registerRequestData);

  return accountId
    .mapError(()=>500)
    .map(()=> createLinks(system.address()));
}

export async function loginRequestEndpoint(request: Request, system: System) {
  let loginRequestData: API.LoginBody = request.body;

  if (isUndefinedOrNull(loginRequestData.password) || isUndefinedOrNull(loginRequestData.username)) {
    return Result.Error(400);
  }

  let dbResponse = await database.getUser(system.dbPool, { username: loginRequestData.username });
  
  return dbResponse
    .mapError(()=>500)
    .andThen((user)=> {
      return user.filter(user => user.password === loginRequestData.password)
      .okOr(401);
    });
}