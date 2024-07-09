"use client";

import { PropsWithChildren } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";
import { ClientProviders } from "./components/ClientProviders";
import "@/../styles/global.scss";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <App>
            <ClientProviders>{children}</ClientProviders>
          </App>
        </AntdRegistry>
      </body>
    </html>
  );
}
