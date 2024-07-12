"use client";

import MDEditor from "@uiw/react-md-editor";
import { Form, FormInstance, Input, Radio, Select } from "antd";
import { DocumentChunkDto } from "@/types/document-chunk";

interface Props {
  form?: FormInstance;
  data: DocumentChunkDto;
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
          label="Document ID"
          name="document-id"
        >
          <Input placeholder="Enter document ID" />
        </Form.Item>
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
        <Form.Item
          rules={[
            {
              max: 5000,
              message: "Cannot exceed 5000 characters",
            },
            {
              required: true,
              validator: (_, value) =>
                value?.trim().length > 0
                  ? Promise.resolve()
                  : Promise.reject(new Error("This field is required.")),
            },
          ]}
          label="Content"
          name="content"
        >
          <MDEditor highlightEnable={false} height={340} />
        </Form.Item>
      </div>
    </Form>
  );
};

export default FormUpdate;
