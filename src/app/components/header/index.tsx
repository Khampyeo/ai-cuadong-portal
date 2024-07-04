"use client";

import { useHeaderStore } from "@/stores/headerStore";
import DropdownNotification from "./notify/DropdownNotification";
import styles from "./styles/common.module.scss";
import DropdownUser from "./user/DropdownUser";

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const headerTitle = useHeaderStore((state) => state.headerTitle);
  return (
    <header className={`${styles.container} `}>
      <div className={styles.header}>
        <h1 className={styles.header_title}>{headerTitle}</h1>
        <div className={styles.header_menu}>
          <DropdownNotification />
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
