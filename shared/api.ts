export namespace GameApi {
  export interface LoginBody {
    username: string;
    password: string;
  }

  export interface RegisterBody {
    username: string;
    password: string;
  }

  export interface Link {
    method: "get" | "post";
    path: string;
  }
  
  export interface AuthenticatedLinks<T extends Link> {
    gameState: T;
  }
  
  export interface UnAuthenticatedLinks<T extends Link> {
    login: T;
    register: T;
  }
}

