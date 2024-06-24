import {
  CHUNK_MANAGEMENT,
  DOCUMENT_MANAGEMENT,
  HISTORY_CHATBOT,
  HOMEPAGE,
} from "@/constants/pages";
import MoonIcon from "@/../public/icon/icon_moon.svg";

export const menuItem = [
  HOMEPAGE,
  DOCUMENT_MANAGEMENT,
  CHUNK_MANAGEMENT,
  HISTORY_CHATBOT,
];

export const menuItemUser = [
  {
    key: "1",
    label: "Display & accessibility",
    icon: <MoonIcon />,
  },
];
