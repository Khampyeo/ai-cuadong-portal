"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import useClickOutside from "@/hooks/useDetectClickOutSide";
import { IMenuItem, ISidebarProps } from "@/types/sidebar";
import { sidebarMenuItems } from "./config";
import CollapseIcon from "@/../public/icon/icon_collapse.svg";
import QuestionIcon from "@/../public/icon/icon_question.svg";
import styles from "./common.module.scss";

function filterMenuItems(
  menuItems: IMenuItem[],
  grantedPolicies: Record<string, boolean>,
  features: Record<string, string>
): IMenuItem[] | undefined {
  if (!menuItems || menuItems.length == 0) {
    return undefined;
  }

  return menuItems
    .filter((item) => {
      if (!item.requiredPolicy && !item.requiredFeature) {
        return true;
      }

      if (item.requiredPolicy) {
        if (item.requiredPolicy.endsWith(".*")) {
          const basePolicy = item.requiredPolicy.slice(0, -2);
          const matched = Object.keys(grantedPolicies).some(
            (policy) => policy.startsWith(basePolicy) && grantedPolicies[policy]
          );
          if (!matched) {
            return false;
          }
        } else {
          const matched = grantedPolicies[item.requiredPolicy];
          if (!matched) {
            return false;
          }
        }
      }

      if (item.requiredFeature) {
        const matched = features[item.requiredFeature];
        if (!matched || matched == "false") {
          return false;
        }
      }

      return true;
    })
    .map((item) => {
      const { requiredPolicy, requiredFeature, ...rest } = item;
      return {
        ...rest,
        children: filterMenuItems(
          item.children || [],
          grantedPolicies,
          features
        ),
      };
    });
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: ISidebarProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const { configuration } = useAuth();
  const menuItems = filterMenuItems(
    sidebarMenuItems,
    configuration?.auth.grantedPolicies || {},
    configuration?.features.values || {}
  );
  const [Item, settItem] = useState<string>("/");
  const [defaultOpenItem, setDefaultOpenItem] = useState<string | null>(null);

  const sidebarRef = useClickOutside(() => {
    // if (sidebarOpen) setSidebarOpen(false);
  });

  useEffect(() => {
    let defaultValue: any = {
      parent: null,
      selected: "/",
    };

    sidebarMenuItems.forEach((menuItem) => {
      if (pathName.includes(menuItem?.key)) {
        if (menuItem.children) {
          menuItem.children.forEach((menuChildItem) => {
            if (pathName.includes(menuChildItem.key)) {
              defaultValue = {
                parent: menuItem.key,
                selected: menuChildItem.key,
              };
              return;
            }
          });
        } else {
          defaultValue = {
            parent: null,
            selected: menuItem.key,
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
      className={`${styles.sidebar} ${!sidebarOpen && styles.collapsed} `}
    >
      <div className={`${styles.logo_wrapper} `}>
        <h1>{sidebarOpen ? "AVAGAI" : "A"}</h1>
      </div>
      <div className={styles.content}>
        <Menu
          selectedKeys={[Item]}
          defaultOpenKeys={defaultOpenItem ? [defaultOpenItem] : undefined}
          mode="inline"
          theme={"light"}
          inlineCollapsed={!sidebarOpen}
          items={menuItems}
          onClick={(value) => handleClickNav(value)}
        />
      </div>
      <div className={styles.footer_wrapper}>
        <div className={styles.support}>
          <QuestionIcon />
          <p>Need customer support?</p>
        </div>
        <div className={styles.footer}>
          <p>Copyright ©{new Date().getFullYear()} | All rights reserved</p>
        </div>
      </div>
      <div
        className={`${styles.collapse_icon} ${
          sidebarOpen && styles.rotate_180
        }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <CollapseIcon />
      </div>
    </div>
  );
};

export default Sidebar;
