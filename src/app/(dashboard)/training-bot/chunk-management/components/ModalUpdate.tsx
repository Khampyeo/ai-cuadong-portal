import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Form, Modal } from "antd";
import {
  getChunkDocumentById,
  updateChunkDocument,
} from "@/api/chunk-management.api";
import { DocumentChunkDto } from "@/types/document-chunk";
import FormUpdate from "./FormUpdate";

const ModalUpdate = ({
  chunkIdSelected,
  showModalUpdateChunk,
  closeModalUpdateChunk,
  handleRefetch,
}: any) => {
  const { message } = App.useApp();
  const [formUpdate] = Form.useForm<DocumentChunkDto>();

  const { data, isFetching } = useQuery({
    queryKey: [chunkIdSelected],
    queryFn: () => {
      return getChunkDocumentById(chunkIdSelected);
    },
    enabled: !!chunkIdSelected,
  });

  const updateChunkMutation = useMutation({
    mutationFn: (data: DocumentChunkDto) => {
      return updateChunkDocument(chunkIdSelected, data);
    },
    onSuccess: () => {
      message.success("Create susccessed!");
      closeModalUpdateChunk();
      handleRefetch();
    },
  });

  const handleSubmit = () => {
    formUpdate.validateFields().then((values) => {
      updateChunkMutation.mutate(values);
    });
  };

  const handleCancel = () => {
    closeModalUpdateChunk();
  };

  return (
    <>
      <Modal
        open={showModalUpdateChunk}
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
