import { Checkbox, Form, Input, message, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { createRole } from "@/api/role-management.api";
import { RoleDto } from "@/types/role";

type Props = {
  isOpen: boolean;
  onClose: (success?: boolean) => void;
};

const CreateModal = ({ isOpen, onClose }: Props) => {
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: (record: RoleDto) => {
      return createRole(record);
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
    form.validateFields().then((values: RoleDto) => {
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
      title={"Create Role"}
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
