import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/constants/app";
import Cookies from "js-cookie";

export const clearAuthToken = () => {
  if (Cookies.get(AUTH_TOKEN_KEY)) {
    Cookies.remove(AUTH_TOKEN_KEY);
  }
  if (Cookies.get(REFRESH_TOKEN_KEY)) {
    Cookies.remove(REFRESH_TOKEN_KEY);
  }
};
