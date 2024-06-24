import React from "react";
import { Metadata } from "next";
import styles from "./common.module.scss";
import LoginForm from "@/components/auth/login/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

const Login: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </>
  );
};

export default Login;
