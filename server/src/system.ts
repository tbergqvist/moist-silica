import { Pool } from "mysql";
import { Result } from "./result";
import { Request } from "express";
import { GameApi } from "../../shared/api";
import { HttpResponse } from "./http-response";

export interface EndpointCommon extends GameApi.Link {
  handler: (request: Request, system: System)=>Promise<Result<HttpResponse, number>>;
  authenticationRequired: boolean;
}

export interface AuthenticatedEndpoint extends EndpointCommon {
  authenticationRequired: true;
}

export interface NonAuthenticatedEndpoint extends EndpointCommon {
  authenticationRequired: false;
}

export type Endpoints = GameApi.AuthenticatedLinks<AuthenticatedEndpoint> & GameApi.UnAuthenticatedLinks<NonAuthenticatedEndpoint>;

export interface System {
  dbPool: Pool;
  address: ()=>{ port: number; family: string; address: string; };
  endpoints: Endpoints
}