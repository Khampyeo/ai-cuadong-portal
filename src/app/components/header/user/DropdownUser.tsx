import { useState } from "react";
import { Dropdown } from "antd";
import { useAuth } from "@/contexts/AuthContext";
import { menuItemUser } from "../config";
import Display from "../display/Display";
import Icon from "@/../public/icon/icon_bot.svg";
import IconChervon from "@/../public/icon/icon_chervon__right.svg";
import IconLogout from "@/../public/icon/icon_logout.svg";
import styles from "../styles/dropdown-user.module.scss";

const DropdownUser = () => {
  const { handleLogout } = useAuth();
  const [isDisplaySetting, setIsDisplaySetting] = useState(false);

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      onOpenChange={() => setIsDisplaySetting(false)}
      dropdownRender={() => (
        <div
          className={`${styles.dropdown_container} ${
            isDisplaySetting && styles.display_setting
          }`}
        >
          {menuItemUser({ setIsDisplaySetting }).map(
            (item: any, key: number) => (
              <div
                key={key}
                className={styles.label_wrapper}
                onClick={item.onClick}
              >
                {item.icon}
                <p>{item.label}</p>
                <div className={styles.chervon}>
                  <IconChervon />
                </div>
              </div>
            )
          )}
          <div className={styles.logout} onClick={() => handleLogout()}>
            <IconLogout />
            <p>Log out</p>
          </div>
          <Display
            isDisplaySetting={isDisplaySetting}
            setIsDisplaySetting={setIsDisplaySetting}
          />
        </div>
      )}
    >
      <div className={styles.user_container}>
        <Icon />
      </div>
    </Dropdown>
  );
};

export default DropdownUser;
