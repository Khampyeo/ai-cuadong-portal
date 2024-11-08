import { App, Form, Modal } from "antd";
import { DocumentChunkDto } from "@/types/document-chunk";
import FormUpdate from "./FormUpdate";

type Props = {
  chunkId: string;
  onClose: (success?: boolean) => void;
};

const ModalUpdate = ({ chunkId, onClose }: Props) => {
  const { message } = App.useApp();
  const [formUpdate] = Form.useForm<DocumentChunkDto>();

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
