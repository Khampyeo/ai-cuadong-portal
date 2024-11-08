import { App, Form, Input, Modal } from "antd";
import { TenantDto } from "@/types/tenant";

type Props = {
  onClose: (success?: boolean) => void;
  record?: TenantDto;
};

const UpdateModal = ({ record, onClose }: Props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<TenantDto>();

  const handleSubmit = () => {
    form.validateFields().then((values) => {});
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Modal
      open={true}
      title={"Update Tenant"}
      width={600}
      okText={"Update"}
      onOk={handleSubmit}
      onCancel={handleCancel}
      centered
    >
      <div>
        <Form
          form={form}
          autoComplete="off"
          layout="vertical"
          initialValues={record}
        >
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            label="Tenant Name"
            name="name"
            rules={[{ required: true, message: "Please input tenant name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateModal;
