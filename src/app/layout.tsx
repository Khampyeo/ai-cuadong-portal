"use client";

import { PropsWithChildren } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App, ConfigProvider } from "antd";
import { ClientProviders } from "./components/ClientProviders";
import "@/../styles/global.scss";
import "regenerator-runtime/runtime";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <App>
            <ClientProviders>
              <ConfigProvider
                theme={{
                  token: {
                    colorPrimary: "#ea580c",
                  },
                }}
              >
                {children}
              </ConfigProvider>
            </ClientProviders>
          </App>
        </AntdRegistry>
      </body>
    </html>
  );
}
