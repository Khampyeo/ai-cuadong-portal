import { useEffect, useState } from "react";
import styles from "./common.module.scss";
import { Tooltip } from "antd";
const RenderContent = ({ text, lineNum = 2 }: any) => {
  const [isOverflowed, setIsOverflowed] = useState(false);
  useEffect(() => {
    const ele = document.getElementById(`wrapper +${text}`);
    if (ele) {
      setIsOverflowed(ele.offsetHeight < ele.scrollHeight);
    }
  }, [text]);

  return (
    <div className={styles.wrapper}>
      <div
        id={`wrapper +${text}`}
        className={`${styles[`lineNum_${lineNum}`]} ${
          styles.wrapperMoreDetails
        }`}
      >
        {text}
      </div>
      {isOverflowed && (
        <Tooltip className={styles.tooltip} placement="topLeft" title={text}>
          {text}
        </Tooltip>
      )}
    </div>
  );
};
export default RenderContent;
