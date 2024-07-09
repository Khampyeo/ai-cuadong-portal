import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "antd";
import { AuthProvider } from "@/contexts/AuthContext";

const ClientProviders = ({ children }: React.PropsWithChildren) => {
  const { message } = App.useApp();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 0,
      },
      mutations: {
        onError: (error: string | unknown) => {
          if (typeof error == "string") {
            message.error(error);
          }
        },
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export { ClientProviders };
