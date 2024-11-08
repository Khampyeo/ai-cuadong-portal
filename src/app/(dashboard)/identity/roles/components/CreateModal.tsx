import { App, Checkbox, Form, Input, Modal } from "antd";
import { RoleDto } from "@/types/role";

type Props = {
  onClose: (success?: boolean) => void;
};

const CreateModal = ({ onClose }: Props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<RoleDto>();

  const handleSubmit = () => {
    form.validateFields().then((values) => {});
  };

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Modal
      open={true}
      title={"Create Role"}
      width={600}
      onOk={handleSubmit}
      okText={"Create"}
      onCancel={handleCancel}
      centered
    >
      <div>
        <Form form={form} autoComplete="off" layout="vertical">
          <Form.Item
            label="Role Name"
            name="name"
            rules={[{ required: true, message: "Please input role name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="isDefault" valuePropName="checked">
            <Checkbox>Default</Checkbox>
          </Form.Item>
          <Form.Item name="isPublic" valuePropName="checked">
            <Checkbox>Public</Checkbox>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateModal;
