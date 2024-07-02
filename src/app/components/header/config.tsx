import {
  CHUNK_MANAGEMENT,
  DOCUMENT_MANAGEMENT,
  HISTORY_CHATBOT,
  HOMEPAGE,
  IDENTITY_MANAGEMENT,
  IDENTITY_ROLES,
  IDENTITY_USERS,
  TENANT_MANAGEMENT,
} from "@/constants/pages";
import MoonIcon from "@/../public/icon/icon_moon.svg";

export const menuItem = [
  HOMEPAGE,
  DOCUMENT_MANAGEMENT,
  CHUNK_MANAGEMENT,
  HISTORY_CHATBOT,
  TENANT_MANAGEMENT,
  IDENTITY_MANAGEMENT,
  IDENTITY_USERS,
  IDENTITY_ROLES,
];

export const menuItemUser = ({ setIsDisplaySetting }: any) => [
  {
    key: "1",
    label: "Display & accessibility",
    icon: <MoonIcon />,
    onClick: () => setIsDisplaySetting(true),
  },
];
