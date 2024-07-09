"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/constants/routes";
import { useAuth } from "@/contexts/AuthContext";
import Header from "../header";
import Sidebar from "../sidebar/Sidebar";
import styles from "./common.module.scss";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { checkPermission } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    let requiredPolicy: string | undefined;
    routes.forEach((menuItem) => {
      if (pathName.includes(menuItem?.key)) {
        if (menuItem.children) {
          menuItem.children.forEach((menuChildItem) => {
            if (pathName.includes(menuChildItem.key)) {
              requiredPolicy = menuChildItem.requiredPolicy;
            }
          });
        } else {
          requiredPolicy = menuItem.requiredPolicy;
        }
      }
    });

    if (requiredPolicy && !checkPermission(requiredPolicy)) {
      router.push("/");
    }
  }, [pathName, router, checkPermission]);

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
