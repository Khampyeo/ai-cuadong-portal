import { useMutation } from "@tanstack/react-query";
import { Form, message, Modal } from "antd";
import { createChunkDocument } from "@/api/chunk-management.api";
import FormCreate from "./FormCreate";
import styles from "../styles/modal-create.module.scss";

const ModalCreate = ({
  showModalCreateChunk,
  closeModalCreateChunk,
  handleRefetch,
}: any) => {
  //Add document
  const [formAdd] = Form.useForm();

  const mutationAddChunk = useMutation({
    mutationFn: () => {
      const body = {
        documentId: formAdd.getFieldValue(["document-id"]),
        content: formAdd.getFieldValue(["content"]),
        language: formAdd.getFieldValue(["language"]),
        status: formAdd.getFieldValue(["status"]),
      };
      return createChunkDocument(body);
    },
    onSuccess: async (data: any) => {
      message.success("Create susccessed!");
      closeModalCreateChunk();
      handleRefetch();
    },
    onError: async (error: any) => {
      message.error("Create failed!");
      console.log(error);
    },
  });

  return (
    <>
      <Modal
        open={showModalCreateChunk}
        title={"Add chunk"}
        width={800}
        onOk={() => mutationAddChunk.mutate()}
        onCancel={closeModalCreateChunk}
        okText={"Add"}
        centered
        maskClosable={false}
      >
        <div className={styles.modal_wrapper}>
          <FormCreate form={formAdd} />
        </div>
      </Modal>
    </>
  );
};

export default ModalCreate;
