import { App, Form, Modal } from "antd";
import { DocumentDto } from "@/types/document";
import FormCreate from "./FormCreate";

type Props = {
  onClose: (success?: boolean) => void;
};

const ModalCreate = ({ onClose }: Props) => {
  const { message } = App.useApp();
  const [formAdd] = Form.useForm<DocumentDto>();

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
        title={"Create document"}
        width={800}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={"Create"}
        centered
      >
        <FormCreate form={formAdd} />
      </Modal>
    </>
  );
};

export default ModalCreate;
