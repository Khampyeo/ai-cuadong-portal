import { Button, Flex, Modal } from "antd";
import styles from "./common.module.scss";
import DeleteIcon from "@/../public/icon/icon_delete.svg";

interface props {
  isOpen: boolean;
  handleClose: () => void;
  handleOk: () => void;
  message?: string | null;
  icon?: React.ReactNode | null;
  color?: "red" | "blue" | "yellow" | "green";
}
const Notification = ({
  isOpen,
  handleClose,
  handleOk,
  message,
  color = "blue",
  icon,
}: props) => {
  return (
    <Modal
      className={styles.modal}
      maskClosable={false}
      keyboard={false}
      open={isOpen}
      onCancel={handleClose}
      centered
      title={
        icon && (
          <Flex justify="center" align="center" gap={8}>
            <span className={`${styles.icon} ${styles[color]}`}>{icon}</span>
          </Flex>
        )
      }
      footer={
        <div className={styles.modal_footer}>
          <Button
            className={`${styles.btn__no} ${styles.btn}`}
            onClick={handleClose}
          >
            No
          </Button>
          <Button
            className={`${styles.btn__yes} ${styles.btn} ${
              styles[`btn-${color}`]
            }`}
            onClick={handleOk}
          >
            Yes
          </Button>
        </div>
      }
      width={380}
    >
      <p className={styles.message}>{message}</p>
    </Modal>
  );
};
export default Notification;
