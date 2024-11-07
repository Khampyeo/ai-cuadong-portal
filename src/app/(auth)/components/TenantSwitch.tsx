import { useMutation } from "@tanstack/react-query";
import { Form, Input, Modal } from "antd";
import Cookies from "js-cookie";
import { findTenantByName } from "@/api/abp-tenant.api";
import { COOKIE_TENANT_KEY } from "@/constants/app";

type Props = {
  onCancel: () => void;
  onSuccess: (name: string) => void;
};

const TenantSwitch = ({ onCancel, onSuccess }: Props) => {
  const [form] = Form.useForm();

  const findTenantMutation = useMutation({
    mutationFn: (name: string) => {
      return findTenantByName(name);
    },
  });

  const handleSwitch = async () => {
    const name = form.getFieldValue("name");
    if (name) {
      const tenant = await findTenantMutation.mutateAsync(name);
      if (tenant && tenant.success && tenant.isActive) {
        // Set tenant cookie
        Cookies.set(COOKIE_TENANT_KEY, tenant.tenantId);
        onSuccess(tenant.name);
      }
    } else {
      // Remove tenant cookie
      Cookies.remove(COOKIE_TENANT_KEY);
      onSuccess("");
    }
  };

  return (
    <Modal
      open={true}
      title="Switch Tenant"
      maskClosable={false}
      okText="Switch"
      onOk={handleSwitch}
      okButtonProps={{ loading: findTenantMutation.isPending }}
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
