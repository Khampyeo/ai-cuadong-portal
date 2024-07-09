export type LoginRequest = {
  userNameOrEmailAddress: string;
  password: string;
  rememberMe?: boolean;
};

export type LoginResult = {
  result: number;
  description: string;
};
