import HomeIcon from "@/../public/icon/icon_home.svg";
import BotIcon from "@/../public/icon/icon_bot.svg";
import { IMenuItem } from "@/interfaces/sidebar.interface";

export const HOMEPAGE: IMenuItem = {
  key: "/vn/homepage",
  label: "Home",
  icon: <HomeIcon />,
};

export const DOCUMENT_MANAGEMENT: IMenuItem = {
  key: "/vn/training-bot/document-management",
  label: "Document management",
};

export const HISTORY_CHATBOT: IMenuItem = {
  key: "/vn/training-bot/history-chatbot",
  label: "History chatbot",
};

export const CHUNK_MANAGEMENT: IMenuItem = {
  key: "/vn/training-bot/chunk-management",
  label: "Chunk management",
};

export const TRAINING_BOT: IMenuItem = {
  key: "/vn/training-bot",
  label: "Training bot",
  icon: <BotIcon />,
  children: [DOCUMENT_MANAGEMENT, CHUNK_MANAGEMENT, HISTORY_CHATBOT],
};
