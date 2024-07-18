import { Dispatch, SetStateAction } from "react";
import { useDarkModeStore } from "@/stores/darkmodeStore";
import ArrowIcon from "@/../public/icon/icon_arrow__left.svg";
import MoonIcon from "@/../public/icon/icon_moon.svg";
import styles from "../styles/display.module.scss";

interface DisplayProps {
  isDisplaySetting: boolean;
  setIsDisplaySetting: Dispatch<SetStateAction<boolean>>;
}

const Display = ({ isDisplaySetting, setIsDisplaySetting }: DisplayProps) => {
  const { isDarkMode, setDarkMode } = useDarkModeStore();

  return (
    <div
      className={`${styles.main} ${isDisplaySetting && styles.display_setting}`}
    >
      <h1 className={styles.display_title}>
        <div
          className={styles.icon_wrapper}
          onClick={() => setIsDisplaySetting(false)}
        >
          <ArrowIcon />
        </div>
        Display & accessibility
      </h1>
      <div className={styles.display_container}>
        <div className={styles.icon_wrapper}>
          <MoonIcon />
        </div>
        <div>
          <p className={styles.title}>Dark mode</p>
          <p className={styles.description}>
            Adjust the appearance to reduce glare and give your eyes a break
          </p>
          <div className={styles.radio_btn_wrapper}>
            <p>On</p>
            <label className={styles.radio_btn}>
              <input
                type="radio"
                name="darkMode"
                checked={isDarkMode}
                onChange={() => {
                  setDarkMode(true);
                }}
              />
            </label>
          </div>
          <div className={styles.radio_btn_wrapper}>
            <p>Off</p>
            <label className={styles.radio_btn}>
              <input
                type="radio"
                name="darkMode"
                checked={!isDarkMode}
                onChange={() => {
                  setDarkMode(false);
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
