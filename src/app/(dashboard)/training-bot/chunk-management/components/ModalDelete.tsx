import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import IconDelete from "@/../public/icon/icon_delete.svg";
import { deleteChunkDocument } from "@/api/chunk-management.api";
import Notification from "@/app/components/notification/Notifcation";

const ModalDelete = ({
  chunkIdSelected,
  showModalDeleteChunk,
  closeModalDeleteChunk,
  handleRefetch,
}: any) => {
  const deleteMutation = useMutation({
    mutationFn: () => {
      return deleteChunkDocument(chunkIdSelected);
    },
    onSuccess: () => {
      message.success("Delete successed!");
      closeModalDeleteChunk();
      handleRefetch();
    },
    onError: () => {
      message.error("Delete failed!");
      closeModalDeleteChunk();
      handleRefetch();
    },
  });

  return (
    <Notification
      isOpen={showModalDeleteChunk}
      handleClose={closeModalDeleteChunk}
      handleOk={() => {
        deleteMutation.mutate();
      }}
      color="red"
      icon={<IconDelete />}
      message={"Do you want delete this chunk?"}
    />
  );
};

export default ModalDelete;
