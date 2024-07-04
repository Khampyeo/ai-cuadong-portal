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
  const { isLoading, isAuthenticated, isFetching } = useAuth();

  useEffect(() => {
    if (!isLoading && !isFetching && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router, isFetching]);

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
