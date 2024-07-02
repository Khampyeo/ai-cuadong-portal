"use client";
import FeatureItem from "./components/FeatureItem";
import styles from "./styles/common.module.scss";
import HomepageHeader from "./components/HomepageHeader";
import { useState } from "react";
import { ITEMS } from "@/constants/homepage";

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
