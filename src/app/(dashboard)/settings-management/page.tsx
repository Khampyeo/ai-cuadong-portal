"use client";

import { useEffect } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import { useHeaderStore } from "@/stores/headerStore";
import Emailing from "./components/Emailing";
import HostFeatures from "./components/HostFeatures";

const SettingManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const { checkPermission } = useAuth();

  const items: TabsProps["items"] = [];

  if (checkPermission("SettingManagement.Emailing")) {
    items.push({
      key: "emailing",
      label: "Emailing",
      children: <Emailing />,
    });
  }

  if (checkPermission("FeatureManagement.ManageHostFeatures")) {
    items.push({
      key: "manageHostFeatures",
      label: "Features",
      children: <HostFeatures />,
    });
  }

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
