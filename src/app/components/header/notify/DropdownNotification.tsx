import IconNotification from "@/../public/icon/icon_notify.svg";
import styles from "../styles/dropdown-noti.module.scss";

const DropdownNotification = () => {
  return (
    <>
      <div className={styles.notify}>
        <IconNotification />
      </div>
    </>
  );
};

export default DropdownNotification;
