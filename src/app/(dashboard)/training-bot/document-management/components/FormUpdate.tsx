"use client";

import { DatePicker, Form, FormInstance, Input, Radio, Select } from "antd";
import { DocumentDto } from "@/types/document";

interface Props {
  form?: FormInstance;
  data: DocumentDto;
}
const FormUpdate = ({ form, data }: Props) => {
  return (
    <Form
      form={form}
      autoComplete="off"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 18,
      }}
      initialValues={data}
    >
      <div>
        <div>
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
            label="Document name"
            name="document-name"
          >
            <Input placeholder="Enter document name" />
          </Form.Item>
        </div>
        <Form.Item
          rules={[
            {
              required: true,
              message: "This field is required.",
            },
          ]}
          name="status"
          label="Status"
        >
          <Radio.Group>
            <Radio value={0}>Active</Radio>
            <Radio value={1}>Inactive</Radio>
            <Radio value={2}>Draft</Radio>
          </Radio.Group>
        </Form.Item>
        <div style={{ display: "flex", gap: 64 }}>
          <Form.Item
            style={{ flex: 1 }}
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
            ]}
            label="Language"
            name="language"
          >
            <Select
              placeholder="Choose"
              options={[
                {
                  value: "vi",
                  label: "Vietnamese",
                },
                {
                  value: "ja",
                  label: "Japanese",
                },
                {
                  value: "en",
                  label: "English",
                },
              ]}
            ></Select>
          </Form.Item>
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <Form.Item
            rules={[
              {
                required: true,
                message: "This field is required.",
              },
            ]}
            name="published-date"
            label="Published date"
          >
            <DatePicker placeholder="dd/mm/yyyy" format={"DD/MM/YYYY"} />
          </Form.Item>
        </div>
        <div style={{ flex: 1, position: "relative" }}>
          <Form.Item
            rules={[
              {
                max: 255,
                message: "Cannot exceed 255 characters",
              },
              {
                required: true,
                message: "This field is required.",
              },
            ]}
            name="category"
            label="Category"
          >
            <Input placeholder="Enter category" />
          </Form.Item>
        </div>

        <div style={{ position: "relative" }}>
          <Form.Item
            rules={[
              {
                max: 255,
                message: "Cannot exceed 255 characters",
              },
            ]}
            label="Related link"
            name="related-link"
          >
            <Input placeholder="Enter related link" />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

export default FormUpdate;
