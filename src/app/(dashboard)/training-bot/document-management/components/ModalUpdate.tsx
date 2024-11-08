import { App, Form, Modal } from "antd";
import { DocumentDto } from "@/types/document";
import FormUpdate from "./FormUpdate";

type Props = {
  documentId: string;
  onClose: (success?: boolean) => void;
};

const ModalUpdate = ({ documentId, onClose }: Props) => {
  const { message } = App.useApp();
  const [formUpdate] = Form.useForm<DocumentDto>();

  const handleSubmit = () => {
    formUpdate.validateFields().then((values) => {});
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <>
      <Modal
        open={true}
        title={"Update document"}
        width={800}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={"Update"}
        centered
      ></Modal>
    </>
  );
};

export default ModalUpdate;
