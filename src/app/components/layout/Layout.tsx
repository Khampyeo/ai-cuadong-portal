"use client";

import React, { useState } from "react";
import Header from "../header";
import Sidebar from "../sidebar/Sidebar";
import styles from "./common.module.scss";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
