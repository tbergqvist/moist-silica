export interface LoginState {
  loading: boolean;
  error: string;
}

export interface RegisterState {
  loading: boolean;
  error: string;
}

export interface State {
  login: LoginState;
  register: RegisterState;
}