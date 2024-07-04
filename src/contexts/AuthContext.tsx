"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { getAccount, login, logout } from "@/api/authenticate.api";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  isFetching: boolean;
  account: any | null;
  errorMessage: string | null;
  handleLogin: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: true,
  isFetching: true,
  account: null,
  handleLogin: async () => {},
  handleLogout: () => {},
  errorMessage: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [account, setAccount] = useState<any | null>(null);

  useEffect(() => {
    handleGetAccount();
    setIsLoading(false);
  }, []);

  const handleGetAccount = async () => {
    try {
      setIsFetching(true);
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
    setIsFetching(false);
  };

  const handleLogin = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    setIsFetching(true);
    try {
      const response = await login({
        userNameOrEmailAddress: email,
        password,
        rememberMe,
      });
      if (response.status === 200 && response.data.result === 1) {
        await handleGetAccount();
        router.push("/");
      } else {
        setErrorMessage("Authentication Failed");
      }
    } catch (error) {
      setErrorMessage("Authentication Failed");
      console.error(error);
    }
    setIsFetching(false);
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setAccount(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isFetching,
        account,
        handleLogin,
        errorMessage,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
