import { Dropdown } from "antd";
import styles from "./common.module.scss";
import Icon from "@/../public/icon/icon_bot.svg";
import { menuItemUser } from "./config";
import IconLogout from "@/../public/icon/icon_logout.svg";
const DropdownUser = () => {
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      dropdownRender={() => (
        <div className={styles.dropdown_container}>
          {menuItemUser.map((item: any, key: number) => (
            <div key={key} className={styles.label_wrapper}>
              <p>{item.label}</p>
            </div>
          ))}
          <div className={styles.logout}>
            <IconLogout />
            <p>Log out</p>
          </div>
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
