"use client";

import { useEffect } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useHeaderStore } from "@/stores/headerStore";
import Emailing from "./components/Emailing";
import HostFeatures from "./components/HostFeatures";

const SettingManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);

  const items: TabsProps["items"] = [];

  items.push({
    key: "emailing",
    label: "Emailing",
    children: <Emailing />,
  });
  items.push({
    key: "manageHostFeatures",
    label: "Features",
    children: <HostFeatures />,
  });

  useEffect(() => {
    setHeaderTitle("Settings Management");
    return () => {
      setHeaderTitle("");
    };
  }, [setHeaderTitle]);

  return (
    <>
      <Tabs
        tabPosition="left"
        items={items}
        className="bg-background-primary"
      />
    </>
  );
};
export default SettingManagement;
