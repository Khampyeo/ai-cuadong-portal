import MoonIcon from "@/../public/icon/icon_moon.svg";
import styles from "../styles/display.module.scss";
import { Radio } from "antd";
const Display = () => {
  return (
    <div className={styles.display_container}>
      <div className={styles.icon_wrapper}>
        <MoonIcon />
      </div>
      <div className="">
        <p>Dark mode</p>
        <p>
          Adjust the appearance of Facebook to reduce glare and give your eyes a
          break.
        </p>
        <Radio.Group className={styles.radio_wrapper}>
          <div className="">
            <Radio value={1} />
          </div>
          <div className="">
            <Radio value={2} />
          </div>
        </Radio.Group>
      </div>
    </div>
  );
};

export default Display;
