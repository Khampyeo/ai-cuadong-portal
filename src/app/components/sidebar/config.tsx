import {
  HOMEPAGE,
  IDENTITY_MANAGEMENT,
  SETTING_MANAGEMENT,
  TENANT_MANAGEMENT,
  TRAINING_BOT,
} from "@/constants/routes";
import { IMenuItem } from "@/types/sidebar";

export const sidebarMenuItems: IMenuItem[] = [
  HOMEPAGE,
  TRAINING_BOT,
  TENANT_MANAGEMENT,
  IDENTITY_MANAGEMENT,
  SETTING_MANAGEMENT,
];
