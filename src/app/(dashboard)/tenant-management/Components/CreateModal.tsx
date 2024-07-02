import { Form, Input, message, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { createTenant } from "@/api/tenant-management.api";
import { TenantDto } from "@/types/tenant";

type Props = {
  isOpen: boolean;
  onClose: (success?: boolean) => void;
};

const CreateModal = ({ isOpen, onClose }: Props) => {
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: (record: TenantDto) => {
      return createTenant(record);
    },
    onSuccess: () => {
      message.success("Create successful!");
      form.resetFields();
      onClose(true);
    },
    onError: () => {
      message.error("Create failed!");
    },
  });

  const onSubmit = () => {
    form.validateFields().then((values: TenantDto) => {
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
      title={"Create Tenant"}
      width={600}
      onOk={() => onSubmit()}
      okText={"Create"}
      onCancel={() => onCloseClick()}
      confirmLoading={mutation.isPending}
      centered
    >
      <div>
        <Form form={form} autoComplete="off" layout="vertical">
          <Form.Item
            label="Tenant Name"
            name="name"
            rules={[{ required: true, message: "Please input tenant name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Admin Email Address"
            name="adminEmailAddress"
            rules={[
              { required: true, message: "Please input admin email address!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Admin Password"
            name="adminPassword"
            rules={[
              { required: true, message: "Please input admin password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateModal;
