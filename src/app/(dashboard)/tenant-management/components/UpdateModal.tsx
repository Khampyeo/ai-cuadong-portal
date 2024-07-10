import { useMutation } from "@tanstack/react-query";
import { App, Form, Input, Modal } from "antd";
import { updateTenant } from "@/api/tenant-management.api";
import { TenantDto } from "@/types/tenant";

type Props = {
  isOpen: boolean;
  onClose: (success?: boolean) => void;
  record?: TenantDto;
};

const UpdateModal = ({ record, isOpen, onClose }: Props) => {
  const { message } = App.useApp();
  const [form] = Form.useForm();

  const mutation = useMutation({
    mutationFn: (record: TenantDto) => {
      return updateTenant(record.id, record);
    },
    onSuccess: () => {
      message.success("Update successful!");
      onClose(true);
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
      title={"Update Tenant"}
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
