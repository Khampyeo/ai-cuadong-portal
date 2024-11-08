import { SaveOutlined, SendOutlined } from "@ant-design/icons";
import { App, Button, Checkbox, Form, Input, Skeleton } from "antd";
import { useToggle } from "@/hooks/useToggle";
import { EmailingDto } from "@/types/settings-management";
import SendTestEmailModal from "./SendTestEmailModal";

const Emailing = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm<EmailingDto>();
  const [isModalOpen, , hideModal, showModal] = useToggle();

  const smtpUseDefaultCredentialsValue = Form.useWatch(
    "smtpUseDefaultCredentials",
    form
  );

  const data: any = [];

  const onFinish = (values: EmailingDto) => {};

  return (
    <div className="max-w-lg p-5">
      <Form
        form={form}
        autoComplete="off"
        layout="vertical"
        initialValues={data}
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
          >
            Save
          </Button>

          <Button
            size="large"
            type="primary"
            htmlType="button"
            icon={<SendOutlined />}
            onClick={showModal}
          >
            Send Test Email
          </Button>
        </div>
      </Form>
      {isModalOpen && <SendTestEmailModal onClose={hideModal} />}
    </div>
  );
};

export default Emailing;
