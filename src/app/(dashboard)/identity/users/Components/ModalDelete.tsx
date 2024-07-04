import { useMutation } from "@tanstack/react-query";
import { message } from "antd";
import { deleteUser } from "@/api/users-management.api";
import Notification from "@/app/components/notification/Notifcation";
import IconDelete from "@/../public/icon/icon_delete.svg";

const ModalDelete = ({
  userIdSelected,
  showModalDeleteUser,
  closeModalDeleteUser,
  handleRefetch,
}: any) => {
  const deleteMutation = useMutation({
    mutationFn: () => {
      return deleteUser(userIdSelected);
    },
    onSuccess: () => {
      message.success("Delete successed!");
      closeModalDeleteUser();
      handleRefetch();
    },
    onError: () => {
      message.error("Delete failed!");
      closeModalDeleteUser();
      handleRefetch();
    },
  });

  return (
    <Notification
      isOpen={showModalDeleteUser}
      handleClose={closeModalDeleteUser}
      handleOk={() => {
        deleteMutation.mutate();
      }}
      color="red"
      icon={<IconDelete />}
      message={"Do you want delete this user?"}
    />
  );
};

export default ModalDelete;
