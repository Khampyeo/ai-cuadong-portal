import { useEffect, useRef, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import { App, Modal, Tabs } from "antd";
import { TenantDto } from "@/types/tenant";

type Props = {
  onClose: (success?: boolean) => void;
  record?: TenantDto;
};

const FeaturesModal = ({ record, onClose }: Props) => {
  const { message } = App.useApp();

  const [isReady, setIsReady] = useState(false);

  const featureValues = useRef<Record<string, string>>({});

  const getFeatureValue = (key: string) => {
    return featureValues.current[key] || "";
  };

  const updateFeatureValue = (key: string, value: string) => {
    featureValues.current[key] = value;
  };

  const handleSubmit = () => {};

  const handleCancel = () => {
    onClose(false);
  };

  return (
    <Modal
      open={true}
      title={"Features - " + (record?.name || "Host")}
      width={700}
      onOk={handleSubmit}
      okText={"Save"}
      okButtonProps={{
        icon: <SaveOutlined />,
      }}
      onCancel={handleCancel}
      loading={false}
      centered
    >
      <div>
        <Tabs tabPosition="left" items={[]} />
      </div>
    </Modal>
  );
};

export default FeaturesModal;
