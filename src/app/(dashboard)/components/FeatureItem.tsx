"use client";

import { useRouter } from "next/navigation";
import styles from "../styles/feature-item.module.scss";

const FeatureItem = ({ item, hidden = false }: any) => {
  const router = useRouter();
  return (
    <div
      className={`${styles.container} ${hidden && styles.hidden}`}
      onClick={() => item.link && router.push("/features" + item.link)}
    >
      <div className={styles.icon_wrapper}>{item.icon}</div>
      <p className={styles.title}>{item.title}</p>
      <p className={styles.description}>{item.description}</p>
      <div className={styles.type_wrapper}>
        <p className={styles.type}>{item.type}</p>
      </div>
    </div>
  );
};

export default FeatureItem;
