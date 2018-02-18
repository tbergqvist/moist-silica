import { loginRequestEndpoint, registerRequestEndpoint, getGameStateEndpoint } from "./endpoint-handlers";
import { Endpoints } from "./system";

export function setupEndpoints(): Endpoints {
  return {
    login: { method: "post", path: "/login", handler: loginRequestEndpoint, authenticationRequired: false},
    register: { method: "post", path: "/register", handler: registerRequestEndpoint, authenticationRequired: false},
    gameState: { method: "get", path: "/gameState", handler: getGameStateEndpoint, authenticationRequired: true}
  };
}