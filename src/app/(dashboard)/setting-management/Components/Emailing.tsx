import { useEffect } from "react";
import { SaveOutlined, SendOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Button, Checkbox, Form, Input } from "antd";
import { getEmailing, updateEmailing } from "@/api/settings-management.api";
import { EmailingDto } from "@/types/setting-management";

const Emailing = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm<EmailingDto>();

  const smtpUseDefaultCredentialsValue = Form.useWatch(
    "smtpUseDefaultCredentials",
    form
  );

  const { data } = useQuery({
    queryKey: ["emailing"],
    queryFn: () => {
      return getEmailing();
    },
  });

  const mutation = useMutation({
    mutationFn: (values: EmailingDto) => {
      return updateEmailing(values);
    },
    onSuccess: () => {
      message.success("Update successful!");
    },
    onError: () => {},
  });

  const onFinish = (values: EmailingDto) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [form, data]);

  return (
    <div className="max-w-lg p-5">
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Default from display name"
          name="defaultFromDisplayName"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Default from address"
          name="defaultFromAddress"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="SMTP Host"
          name="smtpHost"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="SMTP Port"
          name="smtpPort"
          rules={[{ required: true, message: "Field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="smtpEnableSsl" valuePropName="checked">
          <Checkbox>Enable SSL</Checkbox>
        </Form.Item>
        <Form.Item name="smtpUseDefaultCredentials" valuePropName="checked">
          <Checkbox>Use default credentials</Checkbox>
        </Form.Item>
        {!smtpUseDefaultCredentialsValue && (
          <>
            <Form.Item
              label="SMTP Domain"
              name="smtpDomain"
              rules={[{ required: true, message: "Field is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="SMTP Username"
              name="smtpUserName"
              rules={[{ required: true, message: "Field is required" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="SMTP Password"
              name="smtpPassword"
              rules={[{ required: true, message: "Field is required" }]}
            >
              <Input.Password />
            </Form.Item>
          </>
        )}
        <div className="flex gap-5">
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={mutation.isPending}
          >
            Save
          </Button>

          <Button
            size="large"
            type="primary"
            htmlType="button"
            icon={<SendOutlined />}
          >
            Send Test Email
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Emailing;
