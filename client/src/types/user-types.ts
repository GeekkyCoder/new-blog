export type AuthLoading = {
  registerLoading: boolean;
  loginLoading: boolean;
};

export type AuthError = {
  registerError: null | string;
  loginError: null | string;
};

export type User =
  | {
      firstName: string;
      lastName: string;
      isVerified: string;
      email: string;
      isLoggedIn: boolean;
      role?:string;
      token?:string;
      bio?:string;
    }
  | {};

export interface UserState {
  user: User;
  loading: AuthLoading;
  error: AuthError;
}

export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
