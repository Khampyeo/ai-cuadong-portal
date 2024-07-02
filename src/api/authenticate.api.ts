import axios from "@/config/axios";
import { ENDPOINTS } from "@/constants/endpoints";

export const login = async (body: ILogin) => {
  const response = await axios.post(ENDPOINTS.LOGIN, body);
  return response;
};

export const getAccount = async () => {
  const response = await axios.get(ENDPOINTS.MY_PROFILE);
  return response;
};

export const logout = async () => {
  const response = await axios.get(ENDPOINTS.LOGOUT);
  return response;
};
