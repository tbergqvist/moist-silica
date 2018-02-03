import { loginRequestEndpoint, registerRequestEndpoint } from "./endpoint-handlers";
import { Endpoint } from "./system";

export function setupEndpoints(): Endpoint[] {
  return [
    { method: "post", path: "/login", handler: loginRequestEndpoint, authenticationRequired: false},
    { method: "post", path: "/register", handler: registerRequestEndpoint, authenticationRequired: false},
  ];
}