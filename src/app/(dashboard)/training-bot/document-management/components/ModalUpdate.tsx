import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Form, Modal } from "antd";
import { getDocumentById, updateDocument } from "@/api/document-management.api";
import { DocumentDto } from "@/types/document";
import FormUpdate from "./FormUpdate";

const ModalUpdate = ({
  documentId,
  showModalUpdateDocument,
  closeModalUpdateDocument,
}: any) => {
  const { message } = App.useApp();
  const [formUpdate] = Form.useForm<DocumentDto>();

  const { data, isFetching } = useQuery({
    queryKey: ["document-details", documentId],
    queryFn: () => {
      return getDocumentById(documentId);
    },
    enabled: !!documentId,
  });

  const updateDocumentMutation = useMutation({
    mutationFn: (data: DocumentDto) => {
      return updateDocument(documentId, data);
    },
    onSuccess: () => {
      message.success("Create susccessed!");
      closeModalUpdateDocument();
    },
  });

  const handleSubmit = () => {
    formUpdate.validateFields().then((values) => {
      updateDocumentMutation.mutate(values);
    });
  };

  const handleCancel = () => {
    closeModalUpdateDocument();
  };

  return (
    <>
      <Modal
        open={showModalUpdateDocument}
        title={"Update document"}
        width={800}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={"Update"}
        centered
        loading={isFetching}
      >
        {data && <FormUpdate form={formUpdate} data={data} />}
      </Modal>
    </>
  );
};

export default ModalUpdate;
