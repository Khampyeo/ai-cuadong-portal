import Notification from "@/app/components/notification/Notifcation";
import IconDelete from "@/../public/icon/icon_delete.svg";
import { useMutation } from "@tanstack/react-query";
import { deleteDocument } from "@/api/document-management.api";
import { message } from "antd";
const ModalDelete = ({
  documentIdSelected,
  showModalDeleteDocument,
  closeModalDeleteDocument,
}: any) => {
  const deleteMutation = useMutation({
    mutationFn: () => {
      return deleteDocument(documentIdSelected);
    },
    onSuccess: () => {
      message.success("Delete successed!");
      closeModalDeleteDocument();
    },
    onError: () => {
      message.error("Delete failed!");
      closeModalDeleteDocument();
    },
  });

  return (
    <Notification
      isOpen={showModalDeleteDocument}
      handleClose={closeModalDeleteDocument}
      handleOk={() => {
        deleteMutation.mutate();
      }}
      color="red"
      icon={<IconDelete />}
      message={"Do you want delete this document?"}
    />
  );
};

export default ModalDelete;
