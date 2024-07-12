"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { findRouteByPath } from "@/constants/routes";
import { useAuth } from "@/contexts/AuthContext";
import Header from "../header";
import Sidebar from "../sidebar/Sidebar";
import styles from "./common.module.scss";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkPermission, checkFeature } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const route = findRouteByPath(pathName);

    if (route) {
      if (route.requiredPolicy && !checkPermission(route.requiredPolicy)) {
        router.push("/");
      }

      if (route.requiredFeature && !checkFeature(route.requiredFeature)) {
        router.push("/");
      }
    }
  }, [pathName, router, checkPermission, checkFeature]);

  return (
    <>
      <div className={styles.layout}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div
          className={`${styles.content_container} ${
            sidebarOpen ? styles.sidebar_opened : styles.sidebar_closed
          }`}
        >
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className={`${styles.main_content} `}>
            <div className={styles.content}>{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
