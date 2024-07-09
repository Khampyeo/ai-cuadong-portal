"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { getApplicationConfiguration } from "@/api/application-configuration.api";
import { login, logout } from "@/api/authenticate.api";
import { ApplicationConfiguration } from "@/types/application-configuration";

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  isFetching: boolean;
  configuration?: ApplicationConfiguration;
  errorMessage: string | null;
  handleLogin: (
    username: string,
    password: string,
    rememberMe: boolean
  ) => Promise<void>;
  handleLogout: () => void;
  checkPermission: (name: string) => boolean;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: true,
  isFetching: false,
  configuration: undefined,
  handleLogin: async () => {},
  handleLogout: () => {},
  errorMessage: null,
  checkPermission: () => false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [configuration, setConfiguration] = useState<
    ApplicationConfiguration | undefined
  >(undefined);

  useEffect(() => {
    handleGetApplicationConfiguration();
  }, []);

  const handleGetApplicationConfiguration = async () => {
    try {
      setIsLoading(true);
      const response = await getApplicationConfiguration();

      if (response) {
        setConfiguration(response);
        if (response.currentUser.isAuthenticated) {
          setIsAuthenticated(true);
        }
      } else {
        throw new Error("Failed to fetch account");
      }
    } catch (error) {
      console.error(error);
      setIsAuthenticated(false);
      setConfiguration(undefined);
    }
    setIsLoading(false);
  };

  const handleLogin = async (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    setIsFetching(true);
    setErrorMessage(null);
    try {
      const response = await login({
        userNameOrEmailAddress: email,
        password,
        rememberMe,
      });
      if (response.result === 1) {
        await handleGetApplicationConfiguration();
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
    setConfiguration(undefined);
    router.push("/login");
  };

  const checkPermission = (name: string) => {
    if (!configuration) {
      return false;
    }

    if (name.endsWith(".*")) {
      const basePolicy = name.slice(0, -2);
      return Object.keys(configuration.auth.grantedPolicies).some(
        (policy) =>
          policy.startsWith(basePolicy) &&
          configuration.auth.grantedPolicies[policy]
      );
    }

    return !!configuration.auth.grantedPolicies[name];
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        isFetching,
        configuration,
        handleLogin,
        errorMessage,
        handleLogout,
        checkPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
