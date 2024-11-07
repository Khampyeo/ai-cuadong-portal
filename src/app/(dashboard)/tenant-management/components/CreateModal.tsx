import { useMutation } from "@tanstack/react-query";
import { App, Form, Input, Modal } from "antd";
import { createTenant } from "@/api/tenant-management.api";
import { TenantDto } from "@/types/tenant";

type Props = {
  onClose: (success?: boolean) => void;
};

const CreateModal = ({ onClose }: Props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<TenantDto>();

  const mutation = useMutation({
    mutationFn: (record: TenantDto) => {
      return createTenant(record);
    },
    onSuccess: () => {
      message.success("Create successful!");
      onClose(true);
    },
  });

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      mutation.mutate(values);
    });
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Modal
      open={true}
      title={"Create Tenant"}
      width={600}
      onOk={handleSubmit}
      okText={"Create"}
      onCancel={handleCancel}
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
              {
                required: true,
                type: "email",
                message: "Please input admin email address!",
              },
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
