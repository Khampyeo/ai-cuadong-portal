"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button, Checkbox, Divider, Form, Input } from "antd";
import Cookies from "js-cookie";
import { findTenantById } from "@/api/abp-tenant.api";
import { COOKIE_TENANT_KEY } from "@/constants/app";
import { useAuth } from "@/contexts/AuthContext";
import { useToggle } from "@/hooks/useToggle";
import TenantSwitch from "./TenantSwitch";
import EmailIcon from "@/../public/icon/icon_email.svg";
import LockIcon from "@/../public/icon/icon_lock.svg";
import UnlockIcon from "@/../public/icon/icon_unlock.svg";
import styles from "../styles/login-form.module.scss";

const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const { handleLogin, isFetching, errorMessage } = useAuth();
  const [tenantName, setTenantName] = useState("");
  const [
    isTenantSwitchModalOpen,
    ,
    hideTenantSwitchModal,
    showTenantSwitchModal,
  ] = useToggle();

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      login();
    }
  };

  useEffect(() => {
    const tenantId = Cookies.get(COOKIE_TENANT_KEY);
    if (tenantId) {
      const fetchTenantInfo = async () => {
        const tenant = await findTenantById(tenantId);
        if (tenant && tenant.success) {
          setTenantName(tenant.name);
        }
      };

      fetchTenantInfo();
    }
  }, []);

  return (
    <Form form={form} className={styles.login_container} layout="vertical">
      <h1>Welcome!</h1>
      <Divider />
      <div className="flex justify-between items-center w-full">
        <div>
          <div>
            <div className="uppercase">Tenant</div>
            <div className="font-medium">
              {tenantName ? (
                <span>{tenantName}</span>
              ) : (
                <span>(Not selected)</span>
              )}
            </div>
          </div>
        </div>
        <div>
          <Button onClick={showTenantSwitchModal}>Switch</Button>
        </div>
      </div>
      <Divider className="!mb-0" />
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
              handleKeyDown(e);
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
              handleKeyDown(e);
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
      {errorMessage && (
        <div className={styles.error_message}>{errorMessage}</div>
      )}
      <Button
        size="large"
        className={styles.login_btn}
        type="primary"
        onClick={() => login()}
        loading={isFetching}
      >
        Login
      </Button>
      {isTenantSwitchModalOpen && (
        <TenantSwitch
          onCancel={hideTenantSwitchModal}
          onSuccess={(name: string) => {
            setTenantName(name);
            hideTenantSwitchModal();
          }}
        />
      )}
    </Form>
  );
};

export default LoginForm;
