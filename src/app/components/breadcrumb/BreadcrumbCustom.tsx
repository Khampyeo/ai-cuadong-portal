import { Breadcrumb } from "antd";
import styles from "./breadcrum.module.scss";

const BreadcrumbCustom = ({ items }: any) => {
  return <Breadcrumb className={styles.breadcrum} items={items} />;
};
export default BreadcrumbCustom;
