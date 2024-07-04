import { Button, Input } from "antd";
import FilterComponent from "@/app/components/filter";
import AddIcon from "@/../public/icon/icon_add__circle.svg";
import ImportIcon from "@/../public/icon/icon_import.svg";
import SearchIcon from "@/../public/icon/icon_search.svg";
import styles from "../styles/header-table.module.scss";

const HeaderTable = ({ openModalCreateChunk }: any) => {
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
        <Button className={`${styles.button_import} ${styles.button}`}>
          Import
          <ImportIcon />
        </Button>
        <Button
          className={`${styles.button_create} ${styles.button}`}
          type="primary"
          onClick={openModalCreateChunk}
        >
          Add Chunk
          <AddIcon />
        </Button>
        {/* <Button
          className={`${styles.button_active} ${styles.button} `}
          type="primary"
        >
          Active
        </Button>
        <Button
          className={`${styles.button_inactive} ${styles.button} `}
          type="primary"
        >
          Inactive
        </Button>
        <Button
          className={`${styles.button_delete} ${styles.button} `}
          type="primary"
        >
          Delete
        </Button> */}
      </div>
    </div>
  );
};

export default HeaderTable;
