import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import IconNotification from "@/../public/icon/icon_notify.svg";
import styles from "./common.module.scss";
const DropdownNotification = () => {
  return (
    <>
      <div className={styles.notify}>
        <IconNotification />
      </div>
    </>
  );
};

export default DropdownNotification;
