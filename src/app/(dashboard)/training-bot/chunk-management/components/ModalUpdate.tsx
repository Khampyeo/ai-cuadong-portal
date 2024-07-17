import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Form, Modal } from "antd";
import {
  getChunkDocumentById,
  updateChunkDocument,
} from "@/api/chunk-management.api";
import { DocumentChunkDto } from "@/types/document-chunk";
import FormUpdate from "./FormUpdate";

type Props = {
  chunkId: string;
  onClose: (success?: boolean) => void;
};

const ModalUpdate = ({ chunkId, onClose }: Props) => {
  const { message } = App.useApp();
  const [formUpdate] = Form.useForm<DocumentChunkDto>();

  const { data, isFetching } = useQuery({
    queryKey: [chunkId],
    queryFn: () => {
      return getChunkDocumentById(chunkId);
    },
    enabled: !!chunkId,
  });

  const updateChunkMutation = useMutation({
    mutationFn: (data: DocumentChunkDto) => {
      return updateChunkDocument(chunkId, data);
    },
    onSuccess: () => {
      message.success("Create susccessed!");
      onClose(true);
    },
  });

  const handleSubmit = () => {
    formUpdate.validateFields().then((values) => {
      updateChunkMutation.mutate(values);
    });
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
        loading={isFetching}
      >
        {data && <FormUpdate form={formUpdate} data={data} />}
      </Modal>
    </>
  );
};

export default ModalUpdate;
