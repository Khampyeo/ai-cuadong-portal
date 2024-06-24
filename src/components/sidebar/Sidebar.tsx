"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "antd";
import { ISidebarProps, IMenuItem } from "@/interfaces/sidebar.interface";
import CollapseIcon from "@/../public/icon/icon_collapse.svg";
import QuestionIcon from "@/../public/icon/icon_question.svg";
import useClickOutside from "@/hooks/useDetectClickOutSide";
import styles from "./common.module.scss";
import { menuSidebar } from "./config";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: ISidebarProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const [Item, settItem] = useState<string>("/vn/homepage");
  const [defaultOpenItem, setDefaultOpenItem] = useState<string | null>(null);

  const sidebarRef = useClickOutside(() => {
    // if (sidebarOpen) setSidebarOpen(false);
  });

  useEffect(() => {
    let menuDatas: IMenuItem[] = menuSidebar;
    let defaultValue: any = {
      parent: null,
      selected: "/vn/homepage",
    };

    menuDatas.forEach((element) => {
      if (pathName.includes(element.key)) {
        if (element.children) {
          element.children.forEach((el) => {
            if (pathName.includes(el.key)) {
              defaultValue = {
                parent: element.key,
                selected: el.key,
              };
              return;
            }
          });
        } else {
          defaultValue = {
            parent: null,
            selected: element.key,
          };
          return;
        }
      }
    });
    settItem(defaultValue.selected);
    setDefaultOpenItem(defaultValue.parent);
  }, [pathName]);

  const handleClickNav = (value: any) => {
    router.push(value.key);
  };

  return (
    <div
      ref={sidebarRef}
      className={`${styles.sidebar} ${!sidebarOpen && styles.collapsed}`}
    >
      <div className={`${styles.logo_wrapper} `}></div>
      <div className={styles.content}>
        <Menu
          selectedKeys={[Item]}
          defaultOpenKeys={defaultOpenItem ? [defaultOpenItem] : undefined}
          mode="inline"
          theme="dark"
          inlineCollapsed={!sidebarOpen}
          items={menuSidebar}
          onClick={(value) => handleClickNav(value)}
        />
      </div>
      <div className={styles.footer_wrapper}>
        <div className={styles.support}>
          <QuestionIcon />
          <p> Need customer support?</p>
        </div>
        <div className={styles.footer}>
          <p> Copyright ©2024 | All rights reserved</p>
        </div>
      </div>
      <div
        className={`${styles.collapse_icon} ${
          !sidebarOpen && styles.rotate_180
        }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <CollapseIcon />
      </div>
    </div>
  );
};

export default Sidebar;
