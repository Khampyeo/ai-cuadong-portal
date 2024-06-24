"use client";
import { getAccount, login } from "@/api/authenticate.api";
import { AUTH_TOKEN_KEY } from "@/constants/app";
import { clearAuthToken } from "@/utils/cookies";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  account: any | null;
  isCheckToken: boolean;
  errorMessage: string | null;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: true,
  account: null,
  handleLogin: async () => {},
  handleLogout: () => {},
  isCheckToken: true,
  errorMessage: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckToken, setIsCheckToken] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [account, setAccount] = useState<any | null>(null);

  useEffect(() => {
    const token = Cookies.get(AUTH_TOKEN_KEY);

    if (token) {
      handleGetAccount().finally(() => {
        setIsLoading(false);
        setIsCheckToken(false);
      });
    } else {
      setIsLoading(false);
      setIsCheckToken(false);
    }
  }, []);

  const handleGetAccount = async () => {
    try {
      const response = await getAccount();

      if (response.status === 200 || response.data) {
        setAccount(response.data);
        setIsAuthenticated(true);
      } else {
        throw new Error("Failed to fetch account");
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setAccount(null);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    setIsFetched(true);
    try {
      const response = await login({ email, password });

      if (response.status === 200) {
        await handleGetAccount();
        router.push("/vn/homepage");
      } else {
        setErrorMessage("Authentication Failed");
      }
    } catch (error) {
      setErrorMessage("Authentication Failed");
      console.error(error);
    }
    setIsFetched(false);
  };

  const handleLogout = () => {
    clearAuthToken();
    setIsAuthenticated(false);
    setAccount(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        account,
        handleLogin,
        errorMessage,
        handleLogout,
        isCheckToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
