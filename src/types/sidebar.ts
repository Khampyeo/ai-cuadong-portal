import { ReactNode } from "react";

export interface ISidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export interface IMenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
  children?: IMenuItem[];
  requiredPolicy?: string;
  requiredFeature?: string;
}
