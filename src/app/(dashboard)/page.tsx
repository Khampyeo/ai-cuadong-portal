"use client";

import { useState } from "react";
import { ITEMS } from "@/constants/homepage";
import FeatureItem from "./components/FeatureItem";
import HomepageHeader from "./components/HomepageHeader";
import styles from "./styles/common.module.scss";

const Homepage = () => {
  const [filterSelectedItem, setFilterSelectedItem] = useState<number>(0);
  setTimeout(() => {}, 3000);
  return (
    <div className={styles.homepage_container}>
      <div className={styles.introdution}></div>
      <div className={styles.content_wrapper}>
        <div className={styles.content_header}>
          <HomepageHeader
            setFilterSelectedItem={setFilterSelectedItem}
            filterSelectedItem={filterSelectedItem}
          />
        </div>
        <div className={styles.content}>
          {ITEMS.map((item, key) => (
            <FeatureItem
              key={key}
              item={item}
              hidden={
                filterSelectedItem !== item.key && filterSelectedItem !== 0
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
