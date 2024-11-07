import { Button, Flex } from "antd";
import { useToggle } from "@/hooks/useToggle";
import FeaturesModal from "../../components/FeaturesManagement/FeaturesModal";

const HostFeatures = () => {
  const [isModalOpen, , hideModal, showModal] = useToggle();

  return (
    <div className="p-5">
      <Flex vertical justify="center" gap={16}>
        <Flex justify="center">
          <div>
            You can manage the host side features by clicking the following
            button.
          </div>
        </Flex>
        <Flex justify="center">
          <Button size="large" type="primary" onClick={showModal}>
            Manage Host Features
          </Button>
        </Flex>
      </Flex>
      {isModalOpen && <FeaturesModal onClose={hideModal} />}
    </div>
  );
};

export default HostFeatures;
