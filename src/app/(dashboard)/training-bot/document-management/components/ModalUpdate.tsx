import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Form, Modal } from "antd";
import { getDocumentById, updateDocument } from "@/api/document-management.api";
import FormUpdate from "./FormUpdate";
import styles from "../styles/modal-update.module.scss";

const ModalUpdate = ({
  documentIdSelected,
  showModalUpdateDocument,
  closeModalUpdateDocument,
}: any) => {
  const { message } = App.useApp();
  const [formUpdate] = Form.useForm();
  const { data, isFetching } = useQuery({
    queryKey: [documentIdSelected],
    queryFn: () => {
      return getDocumentById(documentIdSelected);
    },
    enabled: !!documentIdSelected,
  });
  const mutationUpdateDocument = useMutation({
    mutationFn: () => {
      const body = {
        name: formUpdate.getFieldValue("document-name"),
        category: formUpdate.getFieldValue("category"),
        language: formUpdate.getFieldValue("language"),
        relatedLink: formUpdate.getFieldValue("related-link"),
        status: formUpdate.getFieldValue("status"),
        publishedDate: formUpdate.getFieldValue("published-date"),
      };
      return updateDocument(documentIdSelected, body);
    },
    onSuccess: async (data: any) => {
      message.success("Create susccessed!");
      closeModalUpdateDocument();
    },
  });

  return (
    <>
      <Modal
        open={showModalUpdateDocument}
        title={"Update document"}
        width={800}
        onOk={() => mutationUpdateDocument.mutate()}
        onCancel={closeModalUpdateDocument}
        okText={"Update"}
        centered
      >
        <div className={styles.modal_wrapper}>
          <FormUpdate form={formUpdate} data={data} />
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdate;
