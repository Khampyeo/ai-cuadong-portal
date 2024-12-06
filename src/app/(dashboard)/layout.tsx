"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/app/components/layout/Layout";
import Loader from "@/app/components/loader/Loader";
import { useAuth } from "@/contexts/AuthContext";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router, isLoading]);

  return (
    <>
      {!isLoading && isAuthenticated ? (
        <DefaultLayout>{children}</DefaultLayout>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default MainLayout;
