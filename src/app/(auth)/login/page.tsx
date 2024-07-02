import React from "react";
import { Metadata } from "next";
import styles from "../styles/login-page.module.scss";
import LoginForm from "@/app/(auth)/components/LoginForm";

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
