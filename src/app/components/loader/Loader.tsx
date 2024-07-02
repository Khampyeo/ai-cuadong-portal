import styles from "./common.module.scss";
const Loader = ({ type = "screen", size = "xl" }) => {
  return (
    <div className={`${styles.loader} ${styles[type]} `}>
      <div className={`${styles.loader_item} ${styles[size]}`}></div>
    </div>
  );
};

export default Loader;
