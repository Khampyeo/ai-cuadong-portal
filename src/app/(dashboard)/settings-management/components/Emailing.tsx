import { useEffect } from "react";
import { SaveOutlined, SendOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Button, Checkbox, Form, Input, Skeleton } from "antd";
import { getEmailing, updateEmailing } from "@/api/settings-management.api";
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

  const { data, isFetching } = useQuery({
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
  });

  const onFinish = (values: EmailingDto) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [form, data]);

  if (isFetching) {
    return (
      <div className="p-5">
        <Skeleton />
      </div>
    );
  }

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
            onClick={showModal}
          >
            Send Test Email
          </Button>
        </div>
      </Form>
      <SendTestEmailModal isOpen={isModalOpen} onClose={hideModal} />
    </div>
  );
};

export default Emailing;
