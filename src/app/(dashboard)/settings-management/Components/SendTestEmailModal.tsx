import { useMutation } from "@tanstack/react-query";
import { Form, Input, message, Modal } from "antd";
import { sendTestEmail } from "@/api/settings-management.api";
import { SendTestEmailDto } from "@/types/settings-management";

type Props = {
  isOpen: boolean;
  onClose: (success?: boolean) => void;
};

const SendTestEmailModal = ({ isOpen, onClose }: Props) => {
  const [form] = Form.useForm<SendTestEmailDto>();

  const mutation = useMutation({
    mutationFn: (record: SendTestEmailDto) => {
      return sendTestEmail(record);
    },
    onSuccess: () => {
      message.success("Send test email successful!");
      form.resetFields();
      onClose(true);
    },
    onError: () => {
      message.error("Send test email failed!");
    },
  });

  const onSubmit = () => {
    form.validateFields().then((values: SendTestEmailDto) => {
      mutation.mutate(values);
    });
  };

  const onCloseClick = () => {
    form.resetFields();
    onClose(false);
  };

  return (
    <Modal
      open={isOpen}
      title={"Send Test Email"}
      width={600}
      onOk={() => onSubmit()}
      okText={"Send"}
      onCancel={() => onCloseClick()}
      confirmLoading={mutation.isPending}
      centered={true}
      maskClosable={false}
    >
      <div>
        <Form form={form} autoComplete="off" layout="vertical">
          <Form.Item
            label="Sender Email Address"
            name="senderEmailAddress"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input sender email address.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Target Email Address"
            name="targetEmailAddress"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input target email address.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[
              {
                required: true,
                message: "Please input subject.",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Body"
            name="body"
            rules={[
              {
                required: true,
                message: "Please input body.",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default SendTestEmailModal;
