import { Button, Input } from "antd";
import ExportIcon from "@/../public/icon/icon_export.svg";
import SearchIcon from "@/../public/icon/icon_search.svg";
import FilterComponent from "@/app/components/filter";
import styles from "../styles/header-table.module.scss";

const HeaderTable = () => {
  return (
    <div className={styles.header_table_container}>
      <div className={styles.search_container}>
        <Input
          maxLength={255}
          prefix={<SearchIcon />}
          placeholder="Enter question"
          size="middle"
        />
        <FilterComponent />
      </div>
      <div className={styles.btn_container}>
        <Button className={`${styles.button_export} ${styles.button}`}>
          Export data
          <ExportIcon />
        </Button>
      </div>
    </div>
  );
};

export default HeaderTable;
