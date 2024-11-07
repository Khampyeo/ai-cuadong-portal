"use client";

import { Checkbox, Form, FormInstance, Input, Switch, Tabs } from "antd";
import { RoleDto } from "@/types/role";
import { ignoreCaseCompareFn } from "@/utils/sorting";

type Props = {
  form: FormInstance;
  assignableRoles: RoleDto[];
};

const FormCreate = ({ form, assignableRoles }: Props) => {
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
            <Input placeholder="Enter User Name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                max: 255,
                message: "Cannot exceed 255 characters",
              },
            ]}
            style={{ flex: 1 }}
            label="Name"
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
            <Input type="password" placeholder="Enter Password" />
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
                validator(_, value) {
                  if (!value || form.getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              },
            ]}
            style={{ flex: 1 }}
          >
            <Input type="password" placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item label="&nbsp;" colon={false}>
            <div className="flex justify-between">
              <Form.Item
                style={{ flex: 1 }}
                label="Active"
                colon={false}
                name="isActive"
              >
                <Switch />
              </Form.Item>
              <Form.Item
                style={{ flex: 1 }}
                label="Lockout Enabled"
                colon={false}
                name="lockoutEnabled"
              >
                <Switch />
              </Form.Item>
            </div>
          </Form.Item>
        </>
      ),
    },
    {
      key: "2",
      label: "Roles",
      children: (
        <>
          <Form.Item style={{ flex: 1 }} name="roleNames">
            <Checkbox.Group
              options={assignableRoles
                .map((x) => x.name)
                .toSorted(ignoreCaseCompareFn)}
              className="flex flex-col"
            />
          </Form.Item>
        </>
      ),
    },
  ];

  return (
    <div>
      <Form
        form={form}
        initialValues={{ lockoutEnabled: true, isActive: true }}
        autoComplete="off"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 18,
        }}
      >
        <Tabs defaultActiveKey="1" items={items} />
      </Form>
    </div>
  );
};

export default FormCreate;
