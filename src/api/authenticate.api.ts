import { fetchApi } from "@/config/fetchApi";
import { ENDPOINTS } from "@/constants/endpoints";
import { LoginRequest, LoginResult } from "@/types/authenticate";

export const login = async (body: LoginRequest) => {
  const response = await fetchApi.post<LoginResult>(ENDPOINTS.LOGIN, body);
  return response;
};

export const getAccount = async () => {
  const response = await fetchApi.get(ENDPOINTS.MY_PROFILE);
  return response;
};

export const logout = async () => {
  const response = await fetchApi.get(ENDPOINTS.LOGOUT);
  return response;
};
