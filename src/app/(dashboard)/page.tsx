"use client";

import { useEffect, useState } from "react";
import { ITEMS } from "@/constants/homepage";
import { useHeaderStore } from "@/stores/headerStore";
import FeatureItem from "./components/FeatureItem";
import HomepageHeader from "./components/HomepageHeader";
import styles from "./styles/common.module.scss";

const Homepage = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const [filterSelectedItem, setFilterSelectedItem] = useState<number>(0);
  useEffect(() => {
    setHeaderTitle("Home");
    return () => {
      setHeaderTitle("");
    };
  }, [setHeaderTitle]);
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
