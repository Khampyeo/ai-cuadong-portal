import styles from "./common.module.scss";
import SunIcon from "@/../public/icon/icon_sun.svg";
const DarkModeButton = () => {
  return (
    <div className={styles.mode}>
      <SunIcon />
    </div>
  );
};

export default DarkModeButton;
