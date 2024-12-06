"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  isFetching: boolean;
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
  isFetching: false,
  handleLogin: async () => {},
  handleLogout: () => {},
  errorMessage: null,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const adminData = localStorage.getItem("admin");

    if (adminData === `"admin"`) {
      setIsFetching(true);
      setErrorMessage(null);
      setIsAuthenticated(true);
      setIsLoading(false);
      router.push("/");
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLogin = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    if (email === "admin" && password === "admin") {
      setIsFetching(true);
      setErrorMessage(null);
      setIsAuthenticated(true);
      setIsLoading(false);
      router.push("/");
      localStorage.setItem("admin", JSON.stringify("admin"));
    } else setErrorMessage("Login Fail!");
  };

  const handleLogout = async () => {
    setIsAuthenticated(false);
    router.push("/login");
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isFetching,
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
