import { Dropdown } from "antd";
import styles from "../styles/dropdown-user.module.scss";
import Icon from "@/../public/icon/icon_bot.svg";
import { menuItemUser } from "../config";
import IconLogout from "@/../public/icon/icon_logout.svg";
import IconChervon from "@/../public/icon/icon_chervon__right.svg";
import Display from "../display/Display";
const DropdownUser = () => {
  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      dropdownRender={() => (
        <div className={styles.dropdown_container}>
          {menuItemUser.map((item: any, key: number) => (
            <div key={key} className={styles.label_wrapper}>
              {item.icon}
              <p>{item.label}</p>
              <div className={styles.chervon}>
                <IconChervon />
              </div>
            </div>
          ))}
          <div className={styles.logout}>
            <IconLogout />
            <p>Log out</p>
          </div>
          <Display />
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
