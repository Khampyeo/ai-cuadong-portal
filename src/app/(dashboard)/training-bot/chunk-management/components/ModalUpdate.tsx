import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, message, Modal } from "antd";
import {
  getChunkDocumentById,
  updateChunkDocument,
} from "@/api/chunk-management.api";
import FormUpdate from "./FormUpdate";
import styles from "../styles/modal-update.module.scss";

const ModalUpdate = ({
  chunkIdSelected,
  showModalUpdateChunk,
  closeModalUpdateChunk,
  handleRefetch,
}: any) => {
  //Add document
  const [formUpdate] = Form.useForm();
  const { data, isFetching } = useQuery({
    queryKey: [chunkIdSelected],
    queryFn: () => {
      return getChunkDocumentById(chunkIdSelected);
    },
    enabled: !!chunkIdSelected,
  });
  const mutationUpdateChunk = useMutation({
    mutationFn: () => {
      const body = {
        documentId: formUpdate.getFieldValue(["document-id"]),
        content: formUpdate.getFieldValue(["content"]),
        language: formUpdate.getFieldValue(["language"]),
        status: formUpdate.getFieldValue(["status"]),
      };
      return updateChunkDocument(chunkIdSelected, body);
    },
    onSuccess: async (data: any) => {
      message.success("Create susccessed!");
      closeModalUpdateChunk();
      handleRefetch();
    },
    onError: async (error: any) => {
      message.error("Create failed!");
    },
  });

  return (
    <>
      <Modal
        open={showModalUpdateChunk}
        title={"Update document"}
        width={800}
        onOk={() => mutationUpdateChunk.mutate()}
        onCancel={closeModalUpdateChunk}
        okText={"Update"}
        centered
      >
        <div className={styles.modal_wrapper}>
          <FormUpdate form={formUpdate} data={data?.data} />
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdate;
