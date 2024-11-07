import { fetchApi } from "@/config/fetchApi";
import { LoginRequest, LoginResult } from "@/types/authenticate";

export const login = async (body: LoginRequest) => {
  const response = await fetchApi.post<LoginResult>("/account/login", body);
  return response;
};

export const getAccount = async () => {
  const response = await fetchApi.get("/account/my-profile");
  return response;
};

export const logout = async () => {
  const response = await fetchApi.get("/account/logout");
  return response;
};
