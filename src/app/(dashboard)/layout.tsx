"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ConfigProvider, theme } from "antd";
import DefaultLayout from "@/app/components/layout/Layout";
import Loader from "@/app/components/loader/Loader";
import { useAuth } from "@/contexts/AuthContext";
import { useDarkModeStore } from "@/stores/darkmodeStore";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { isDarkMode } = useDarkModeStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router, isLoading]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      {isLoading || !isAuthenticated ? (
        <Loader />
      ) : (
        <ConfigProvider
          theme={{
            algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          }}
        >
          <DefaultLayout>{children}</DefaultLayout>
        </ConfigProvider>
      )}
    </>
  );
};
export default MainLayout;
