import { Form, Input, Modal } from "antd";
import Cookies from "js-cookie";
import { COOKIE_TENANT_KEY } from "@/constants/app";

type Props = {
  onCancel: () => void;
  onSuccess: (name: string) => void;
};

const TenantSwitch = ({ onCancel, onSuccess }: Props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={true}
      title="Switch Tenant"
      maskClosable={false}
      okText="Switch"
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" className="!pb-1">
        <Form.Item
          name="name"
          label="Tenant Name"
          help="Leave the name field blank to switch to the host side."
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TenantSwitch;
