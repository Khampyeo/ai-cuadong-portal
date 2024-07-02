import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Input, message, Modal } from "antd";
import styles from "../styles/modal-update.module.scss";
import {
  createDocument,
  getDocumentById,
  updateDocument,
} from "@/api/document-management.api";
import FormUpdate from "./FormUpdate";
import moment from "moment";

const ModalUpdate = ({
  documentIdSelected,
  showModalUpdateDocument,
  closeModalUpdateDocument,
}: any) => {
  //Add document
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
        publishedDate: formUpdate.getFieldValue("published-date")
          ? moment(formUpdate.getFieldValue("published-date")).toISOString()
          : "",
      };
      return updateDocument(documentIdSelected, body);
    },
    onSuccess: async (data: any) => {
      message.success("Create susccessed!");
      closeModalUpdateDocument();
    },
    onError: async (data: any) => {
      message.error("Create failed!");
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
          <FormUpdate form={formUpdate} data={data?.data} />
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdate;
