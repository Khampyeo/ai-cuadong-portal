import { IMenuItem } from "@/types/sidebar";
import BotIcon from "@/../public/icon/icon_bot.svg";
import HomeIcon from "@/../public/icon/icon_home.svg";
import SettingsIcon from "@/../public/icon/icon_settings.svg";
import TenantIcon from "@/../public/icon/icon_tenant.svg";
import UsersIcon from "@/../public/icon/icon_users.svg";

export const HOMEPAGE: IMenuItem = {
  key: "/",
  label: "Home",
  icon: <HomeIcon />,
};

export const DOCUMENT_MANAGEMENT: IMenuItem = {
  key: "/training-bot/document-management",
  label: "Document Management",
};

export const HISTORY_CHATBOT: IMenuItem = {
  key: "/training-bot/history-chatbot",
  label: "History Chatbot",
};

export const CHUNK_MANAGEMENT: IMenuItem = {
  key: "/training-bot/chunk-management",
  label: "Chunk Management",
};
export const MODEL_MANAGEMENT: IMenuItem = {
  key: "/training-bot/model-management",
  label: "Model Management",
};
export const TRAINING_BOT: IMenuItem = {
  key: "/training-bot",
  label: "Training Bot",
  icon: <BotIcon />,
  children: [
    DOCUMENT_MANAGEMENT,
    CHUNK_MANAGEMENT,
    HISTORY_CHATBOT,
    MODEL_MANAGEMENT,
  ],
  requiredPolicy: "WebPortal.Documents",
};

export const TENANT_MANAGEMENT: IMenuItem = {
  key: "/tenant-management",
  label: "Tenant Management",
  icon: <TenantIcon />,
  requiredPolicy: "AbpTenantManagement.Tenants",
};

export const IDENTITY_USERS: IMenuItem = {
  key: "/identity/users",
  label: "Users",
  requiredPolicy: "AbpIdentity.Users",
};

export const IDENTITY_ROLES: IMenuItem = {
  key: "/identity/roles",
  label: "Roles",
  requiredPolicy: "AbpIdentity.Roles",
};

export const IDENTITY_MANAGEMENT: IMenuItem = {
  key: "/identity",
  label: "Identity Management",
  icon: <UsersIcon />,
  children: [IDENTITY_USERS, IDENTITY_ROLES],
  requiredPolicy: "AbpIdentity.*",
};

export const SETTING_MANAGEMENT: IMenuItem = {
  key: "/settings-management",
  label: "Setting Management",
  icon: <SettingsIcon />,
  children: [],
  requiredPolicy: "SettingManagement.*",
  requiredFeature: "SettingManagement.Enable",
};

export const routes = [
  HOMEPAGE,
  TRAINING_BOT,
  TENANT_MANAGEMENT,
  IDENTITY_MANAGEMENT,
  SETTING_MANAGEMENT,
];

export const findRouteByPath = (pathName: string): IMenuItem | null => {
  function search(menuItems: IMenuItem[]): IMenuItem | null {
    for (let item of menuItems) {
      if (item.key === pathName) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const found = search(item.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  return search(routes);
};
