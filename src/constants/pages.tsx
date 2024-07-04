import BotIcon from "@/../public/icon/icon_bot.svg";
import HomeIcon from "@/../public/icon/icon_home.svg";
import TenantIcon from "@/../public/icon/icon_tenant.svg";
import UsersIcon from "@/../public/icon/icon_users.svg";
import { IMenuItem } from "@/types/sidebar.interface";

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

export const TRAINING_BOT: IMenuItem = {
  key: "/training-bot",
  label: "Training Bot",
  icon: <BotIcon />,
  children: [DOCUMENT_MANAGEMENT, CHUNK_MANAGEMENT, HISTORY_CHATBOT],
};

export const TENANT_MANAGEMENT: IMenuItem = {
  key: "/tenant-management",
  label: "Tenant Management",
  icon: <TenantIcon />,
};

export const IDENTITY_USERS: IMenuItem = {
  key: "/identity/users",
  label: "Users",
};

export const IDENTITY_ROLES: IMenuItem = {
  key: "/identity/roles",
  label: "Roles",
};

export const IDENTITY_MANAGEMENT: IMenuItem = {
  key: "/identity",
  label: "Identity Management",
  icon: <UsersIcon />,
  children: [IDENTITY_USERS, IDENTITY_ROLES],
};
