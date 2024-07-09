import { useMutation } from "@tanstack/react-query";
import { Checkbox, Form, Input, message, Modal } from "antd";
import { updateRole } from "@/api/role-management.api";
import { RoleDto } from "@/types/role";

type Props = {
  isOpen: boolean;
  onClose: (success?: boolean) => void;
  record?: RoleDto;
};

const UpdateModal = ({ record, isOpen, onClose }: Props) => {
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: (record: RoleDto) => {
      return updateRole(record.id, record);
    },
    onSuccess: () => {
      message.success("Update successful!");
      onClose(true);
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
      title={"Update Role"}
      width={600}
      okText={"Update"}
      onOk={() => onSubmit()}
      onCancel={() => onCloseClick()}
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
