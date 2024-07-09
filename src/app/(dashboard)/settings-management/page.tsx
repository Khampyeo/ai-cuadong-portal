"use client";

import { useEffect } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import { useHeaderStore } from "@/stores/headerStore";
import Emailing from "./Components/Emailing";

const SettingManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const { checkPermission } = useAuth();

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [];

  if (checkPermission("SettingManagement.Emailing")) {
    items.push({
      key: "emailing",
      label: "Emailing",
      children: <Emailing />,
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
        onChange={onChange}
        className="bg-white"
      />
    </>
  );
};
export default SettingManagement;
