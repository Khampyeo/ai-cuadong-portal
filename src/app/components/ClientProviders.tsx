import React from "react";
import { App } from "antd";
import { AuthProvider } from "@/contexts/AuthContext";

const ClientProviders = ({ children }: React.PropsWithChildren) => {
  const { message } = App.useApp();

  return <AuthProvider>{children}</AuthProvider>;
};

export { ClientProviders };
