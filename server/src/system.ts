import { Pool } from "mysql";
import { Result } from "./result";
import { Request } from "express";

export interface Endpoint {
  method: "get" | "post";
  path: string;
  handler: (request: Request, system: System)=>Promise<Result<any, number>>;
  authenticationRequired: boolean;
}

export interface System {
  dbPool: Pool;
  address: ()=>{ port: number; family: string; address: string; };
  endpoints: Endpoint[]
}