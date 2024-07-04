import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ArrowIcon from "@/../public/icon/icon_arrow__left.svg";
import MoonIcon from "@/../public/icon/icon_moon.svg";
import styles from "../styles/display.module.scss";

interface DisplayProps {
  isDisplaySetting: boolean;
  setIsDisplaySetting: Dispatch<SetStateAction<boolean>>;
}

const Display = ({ isDisplaySetting, setIsDisplaySetting }: DisplayProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>();
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.body.classList.toggle("dark-mode", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = (isDarkMode: boolean) => {
    const newTheme = isDarkMode ? "dark" : "light";
    setIsDarkMode(isDarkMode);
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("theme", newTheme);
  };

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
          <div
            className={styles.radio_btn_wrapper}
            onClick={() => toggleTheme(true)}
          >
            <p>On</p>
            <label className={styles.radio_btn}>
              <input type="radio" name="darkMode" checked={isDarkMode} />
            </label>
          </div>
          <div
            className={styles.radio_btn_wrapper}
            onClick={() => toggleTheme(false)}
          >
            <p>Off</p>
            <label className={styles.radio_btn}>
              <input type="radio" name="darkMode" checked={!isDarkMode} />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
