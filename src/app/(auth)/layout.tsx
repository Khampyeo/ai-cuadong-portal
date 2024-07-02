import styles from "./styles/layout-auth.module.scss";
const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <div className={styles.layout}>{children}</div>;
};
export default AuthLayout;
