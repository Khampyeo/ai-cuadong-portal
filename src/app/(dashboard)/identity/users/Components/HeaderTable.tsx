import { Button } from "antd";
import AddIcon from "@/../public/icon/icon_add__circle.svg";
import styles from "../styles/header-table.module.scss";

interface Props {
  openModalCreateUser: () => void;
}
const HeaderTable = ({ openModalCreateUser }: Props) => {
  return (
    <div className={styles.header_table_container}>
      <div className={styles.search_container}></div>
      <div className={styles.btn_container}>
        <Button
          className={`${styles.button_create} ${styles.button}`}
          type="primary"
          onClick={openModalCreateUser}
        >
          <AddIcon />
          New User
        </Button>
      </div>
    </div>
  );
};

export default HeaderTable;
