import { App, Form, Modal } from "antd";
import { DocumentChunkDto } from "@/types/document-chunk";
import FormCreate from "./FormCreate";

type Props = {
  onClose: (success?: boolean) => void;
};

const ModalCreate = ({ onClose }: Props) => {
  const { message } = App.useApp();
  const [formAdd] = Form.useForm<DocumentChunkDto>();

  const handleSubmit = () => {
    formAdd.validateFields().then((values) => {});
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        open={true}
        title={"Add chunk"}
        width={800}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={"Add"}
        centered
        maskClosable={false}
      >
        <FormCreate form={formAdd} />
      </Modal>
    </>
  );
};

export default ModalCreate;
