"use client";

import { useEffect, useState } from "react";
import { Checkbox, Form, FormInstance, Input, Switch, Tabs } from "antd";
import { RoleDto } from "@/types/role";
import styles from "../styles/form-update.module.scss";

interface Props {
  form: FormInstance;
  listRoles: RoleDto[];
}
interface Role {
  value: string;
  label: string;
}
const FormUpdate = ({ form, listRoles }: Props) => {
  const [roles, setRoles] = useState<Role[]>();

  useEffect(() => {
    if (listRoles) {
      setRoles(
        listRoles.map((item: RoleDto) => ({
          value: item.name,
          label: item.name,
        }))
      );
    }
  }, [listRoles]);
  
  const items = [
    {
      key: "1",
      label: "User Information",
      children: (
        <>
          <Form.Item
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
              {
                max: 255,
                message: "Cannot exceed 255 characters",
              },
            ]}
            style={{ flex: 1 }}
            label="Username"
            name="userName"
          >
            <Input placeholder="Enter name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                max: 255,
                message: "Cannot exceed 255 characters",
              },
            ]}
            style={{ flex: 1 }}
            label="name"
            name="name"
          >
            <Input placeholder="Enter Name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                max: 255,
                message: "Cannot exceed 255 characters",
              },
            ]}
            style={{ flex: 1 }}
            label="Surname"
            name="surname"
          >
            <Input placeholder="Enter Surname" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
              {
                max: 255,
                message: "Cannot exceed 255 characters",
              },
            ]}
            style={{ flex: 1 }}
            label="Email"
            name="email"
          >
            <Input placeholder="Enter Email" />
          </Form.Item>

          <div className="flex justify-between">
            <Form.Item style={{ flex: 1 }} label="Active" name="isActive">
              <Switch />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              label="Lockout Enabled"
              name="lockoutEnabled"
            >
              <Switch />
            </Form.Item>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: "Roles",
      children: (
        <>
          <Form.Item style={{ flex: 1 }} name="roles">
            <Checkbox.Group options={roles || []} className="flex flex-col" />
          </Form.Item>
        </>
      ),
      forceRender: true,
    },
  ];

  return (
    <div>
      <Form form={form} className={styles.form_modal_content}>
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </div>
  );
};

export default FormUpdate;
