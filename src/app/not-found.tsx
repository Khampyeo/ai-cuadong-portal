import { Select } from "antd";
import Link from "next/link";
import styles from "@/../styles/not-found.module.scss";

export default function PageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>404</h1>
        <h2>Sorry, we were unable to find that page</h2>
        <Select
          showSearch
          className={styles.select}
          placeholder="Search"
          optionFilterProp="label"
          size="large"
          options={[
            {
              value: "1",
              label: "Not Identified",
            },
          ]}
        />
        <p>
          Start from{" "}
          <Link href={"/"} className={styles.link_homepage}>
            home page
          </Link>
        </p>
      </div>
    </div>
  );
}
