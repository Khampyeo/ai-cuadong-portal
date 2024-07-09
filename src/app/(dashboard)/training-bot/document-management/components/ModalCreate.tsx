import { useMutation } from "@tanstack/react-query";
import { Form, message, Modal } from "antd";
import { createDocument } from "@/api/document-management.api";
import FormCreate from "./FormCreate";
import styles from "../styles/modal-create.module.scss";

const ModalCreate = ({
  showModalCreateDocument,
  closeModalCreateDocument,
}: any) => {
  //Add document
  const [formAdd] = Form.useForm();

  const mutationAddDocument = useMutation({
    mutationFn: () => {
      const body = {
        name: formAdd.getFieldValue(["document-name"]),
        category: formAdd.getFieldValue("category"),
        language: formAdd.getFieldValue("language"),
        relatedLink: formAdd.getFieldValue("related-link"),
        status: formAdd.getFieldValue("status"),
        publishedDate: formAdd.getFieldValue("published-date"),
      };
      return createDocument(body);
    },
    onSuccess: async (data: any) => {
      message.success("Create susccessed!");
      closeModalCreateDocument();
    },
  });

  return (
    <>
      <Modal
        open={showModalCreateDocument}
        title={"Create document"}
        width={800}
        onOk={() => mutationAddDocument.mutate()}
        onCancel={closeModalCreateDocument}
        okText={"Create"}
        centered
      >
        <div className={styles.modal_wrapper}>
          <FormCreate form={formAdd} />
        </div>
      </Modal>
    </>
  );
};

export default ModalCreate;
