import MoonIcon from "@/../public/icon/icon_moon.svg";

export const menuItemUser = ({ setIsDisplaySetting }: any) => [
  {
    key: "1",
    label: "Display & accessibility",
    icon: <MoonIcon />,
    onClick: () => setIsDisplaySetting(true),
  },
];
