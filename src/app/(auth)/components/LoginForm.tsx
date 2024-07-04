"use client";

import React from "react";
import Link from "next/link";
import { Button, Checkbox, Form, Input } from "antd";
import EmailIcon from "@/../public/icon/icon_email.svg";
import LockIcon from "@/../public/icon/icon_lock.svg";
import UnlockIcon from "@/../public/icon/icon_unlock.svg";
import { useAuth } from "@/contexts/AuthContext";
import styles from "../styles/login-form.module.scss";

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const { handleLogin, isFetching } = useAuth();
  console.log(process.env.API_URL);

  const login = () => {
    form
      .validateFields()
      .then(() =>
        handleLogin(
          form.getFieldValue("account"),
          form.getFieldValue("password"),
          form.getFieldValue("remember")
        )
      );
  };

  const onEnterEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <Form form={form} className={styles.login_container} layout="vertical">
      <h1>Welcome !</h1>
      <div className={styles.login_form}>
        <p className={styles.label}>Email</p>
        <Form.Item
          name="account"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              max: 100,
              message: "Cannot exceed 100 characters",
            },
          ]}
        >
          <Input
            size="large"
            maxLength={100}
            placeholder="Enter email or username"
            suffix={<EmailIcon />}
            onKeyDown={(e) => {
              onEnterEvent(e);
            }}
          />
        </Form.Item>
        <p className={styles.label}>Password</p>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              max: 100,
              message: "Cannot exceed 100 characters",
            },
          ]}
        >
          <Input.Password
            size="large"
            type="password"
            maxLength={100}
            placeholder="Enter password"
            iconRender={(visible: boolean) =>
              visible ? <UnlockIcon /> : <LockIcon />
            }
            onKeyDown={(e) => {
              onEnterEvent(e);
            }}
          />
        </Form.Item>

        <div className={styles.remember_forgot_wrapper}>
          <Form.Item
            name="remember"
            valuePropName="checked"
            className={styles.remember_me}
          >
            <Checkbox defaultChecked={false}>Remember me</Checkbox>
          </Form.Item>
          <Link
            className={styles.forgot_password}
            href={"/auth/forgot-password"}
          >
            Forgot password ?
          </Link>
        </div>
      </div>
      <Button
        size="large"
        className={styles.login_btn}
        type="primary"
        onClick={() => login()}
        loading={isFetching}
      >
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
