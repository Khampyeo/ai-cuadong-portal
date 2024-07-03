"use client";
import { Checkbox, Form, Input, Radio, Select, Switch } from "antd";
import styles from "../styles/form-create.module.scss";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRoles } from "@/api/role-management.api";

interface Props {
  form: any;
  selected: number;
  setSelected: any;
}
const FormCreate = ({ form, selected, setSelected }: Props) => {
  const [roles, setRoles] = useState<any>([]);
  const listRoles = useQuery({
    queryKey: ["list-roles"],
    queryFn: async () => {
      return await getRoles();
    },
  });

  useEffect(() => {
    if (listRoles?.data) {
      setRoles(
        listRoles.data.items.map((item: any) => ({
          value: item.name,
          label: item.name,
        }))
      );
    }
  }, [listRoles.data]);

  const validatePassword = (_: any, value: any) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("The two passwords that you entered do not match!")
    );
  };
  return (
    <div className="">
      <div className="flex gap-4 mb-8 font-semibold text-base ">
        <p
          className={`cursor-pointer relative transition-all hover:text-[#1676fd] 
          after:content-[''] after:transition-all after:absolute after:top-full after:w-full after:h-[2px] after:bg-[#1676fd] after:hover:block
          ${selected === 0 ? "text-[#1676fd] after:block" : "after:hidden"}
          `}
          onClick={() => setSelected(0)}
        >
          User Information
        </p>
        <p
          className={`cursor-pointer relative transition-all hover:text-[#1676fd] 
            after:content-[''] after:transition-all after:absolute after:top-full after:w-full after:h-[2px] after:bg-[#1676fd] after:hover:block
            ${selected === 1 ? "text-[#1676fd] after:block" : "after:hidden"}
            `}
          onClick={() => setSelected(1)}
        >
          Roles
        </p>
      </div>
      <Form
        form={form}
        className={styles.form_modal_content}
        initialValues={{ "lockout-enabled": true, "is-active": true }}
      >
        <div className={`${selected !== 0 && "hidden"}`}>
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
            name="username"
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
            label="Password"
            name="password"
          >
            <Input type="password" placeholder="Enter Your Password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
              {
                max: 255,
                message: "Cannot exceed 255 characters",
              },
              {
                validator: validatePassword,
              },
            ]}
            style={{ flex: 1 }}
          >
            <Input type="password" placeholder="Confirm Your Password" />
          </Form.Item>
          <div className="flex justify-between">
            <Form.Item style={{ flex: 1 }} label="Active" name="is-active">
              <Switch />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              label="Lockout Enabled"
              name="lockout-enabled"
            >
              <Switch />
            </Form.Item>
          </div>
        </div>
        <div className={`${selected !== 1 && "hidden"}`}>
          <Form.Item style={{ flex: 1 }} name="roles">
            <Checkbox.Group options={roles} className="flex flex-col" />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default FormCreate;