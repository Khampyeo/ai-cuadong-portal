"use client";

import { FEATURES } from "@/constants/homepage";
import styles from "../styles/homepage-header.module.scss";

const HomepageHeader = ({ filterSelectedItem, setFilterSelectedItem }: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {FEATURES.map((item) => (
          <div
            key={item.key}
            className={`${styles.item} ${
              filterSelectedItem === item.key && styles.item_selected
            }`}
            onClick={() => setFilterSelectedItem(item.key)}
          >
            {item.icons}
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HomepageHeader;
