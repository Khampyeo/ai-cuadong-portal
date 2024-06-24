"use client";

import DefaultLayout from "@/components/layout/Layout";
import Loader from "@/components/loader/Loader";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [isLoading, isAuthenticated]);

  return (
    <>
      {isLoading || !isAuthenticated ? (
        <Loader />
      ) : (
        <DefaultLayout>{children}</DefaultLayout>
      )}
    </>
  );
};
export default MainLayout;
