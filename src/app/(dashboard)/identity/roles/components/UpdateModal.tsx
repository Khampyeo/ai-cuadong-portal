import { useMutation } from "@tanstack/react-query";
import { App, Checkbox, Form, Input, Modal } from "antd";
import { updateRole } from "@/api/role-management.api";
import { RoleDto } from "@/types/role";

type Props = {
  onClose: (success?: boolean) => void;
  record?: RoleDto;
};

const UpdateModal = ({ record, onClose }: Props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm<RoleDto>();

  const mutation = useMutation({
    mutationFn: (record: RoleDto) => {
      return updateRole(record.id, record);
    },
    onSuccess: () => {
      message.success("Update successful!");
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
      title={"Update Role"}
      width={600}
      okText={"Update"}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={mutation.isPending}
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

export default UpdateModal;
