"use client";
import { usePathname } from "next/navigation";
import styles from "./common.module.scss";
import { useEffect, useState } from "react";
import { menuItem } from "./config";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const pathname = usePathname();
  const [title, setTitle] = useState<string | undefined>("");
  useEffect(() => {
    const item = menuItem.find((item) => pathname.endsWith(item.key));
    setTitle(item?.label);
  }, [pathname]);
  return (
    <header className={`${styles.container} `}>
      <div className={styles.header}>
        <h1 className={styles.header_title}>{title}</h1>
        <div className={styles.header_menu}></div>
      </div>
    </header>
  );
};

export default Header;
