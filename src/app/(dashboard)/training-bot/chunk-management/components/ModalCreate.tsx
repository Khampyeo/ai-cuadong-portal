import { useMutation } from "@tanstack/react-query";
import { App, Form, Modal } from "antd";
import { createChunkDocument } from "@/api/chunk-management.api";
import { DocumentChunkDto } from "@/types/document-chunk";
import FormCreate from "./FormCreate";

const ModalCreate = ({
  showModalCreateChunk,
  closeModalCreateChunk,
  handleRefetch,
}: any) => {
  const { message } = App.useApp();
  const [formAdd] = Form.useForm<DocumentChunkDto>();

  const mutationAddChunk = useMutation({
    mutationFn: (data: DocumentChunkDto) => {
      return createChunkDocument(data);
    },
    onSuccess: () => {
      message.success("Create susccessed!");
      closeModalCreateChunk();
      handleRefetch();
    },
  });

  const handleSubmit = () => {
    formAdd.validateFields().then((values) => {
      mutationAddChunk.mutate(values);
    });
  };

  const handleCancel = () => {
    closeModalCreateChunk();
  };

  return (
    <>
      <Modal
        open={showModalCreateChunk}
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
