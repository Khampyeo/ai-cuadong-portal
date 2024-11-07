import { useMutation } from "@tanstack/react-query";
import { App, Form, Modal } from "antd";
import { createChunkDocument } from "@/api/chunk-management.api";
import { DocumentChunkDto } from "@/types/document-chunk";
import FormCreate from "./FormCreate";

type Props = {
  onClose: (success?: boolean) => void;
};

const ModalCreate = ({ onClose }: Props) => {
  const { message } = App.useApp();
  const [formAdd] = Form.useForm<DocumentChunkDto>();

  const mutationAddChunk = useMutation({
    mutationFn: (data: DocumentChunkDto) => {
      return createChunkDocument(data);
    },
    onSuccess: () => {
      message.success("Create susccessed!");
      onClose(true);
    },
  });

  const handleSubmit = () => {
    formAdd.validateFields().then((values) => {
      mutationAddChunk.mutate(values);
    });
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
