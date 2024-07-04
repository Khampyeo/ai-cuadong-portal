"use client";

import { PropsWithChildren } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App } from "antd";
import { AuthProvider } from "@/contexts/AuthContext";
import "@/../styles/global.scss";

export default function RootLayout({ children }: PropsWithChildren) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 0,
      },
    },
  });

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <AntdRegistry>
              <App>{children}</App>
            </AntdRegistry>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
