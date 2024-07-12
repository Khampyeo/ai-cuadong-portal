import { useMutation } from "@tanstack/react-query";
import { App, Form, Modal } from "antd";
import { createDocument } from "@/api/document-management.api";
import { DocumentDto } from "@/types/document";
import FormCreate from "./FormCreate";

type Props = {
  closeModalCreateDocument: () => void;
};

const ModalCreate = ({ closeModalCreateDocument }: Props) => {
  const { message } = App.useApp();
  const [formAdd] = Form.useForm<DocumentDto>();

  const mutationAddDocument = useMutation({
    mutationFn: (data: DocumentDto) => {
      return createDocument(data);
    },
    onSuccess: () => {
      message.success("Create susccessed!");
      closeModalCreateDocument();
    },
  });

  const handleSubmit = () => {
    formAdd.validateFields().then((values) => {
      mutationAddDocument.mutate(values);
    });
  };

  const handleCancel = () => {
    closeModalCreateDocument();
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
