"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, Input, message, Modal } from "antd";
import styles from "../styles/modal-update.module.scss";
import FormUpdate from "./FormUpdate";
import {
  getRoleUserById,
  getUserById,
  updateUser,
} from "@/api/users-management.api";
import { useState } from "react";

const ModalUpdate = ({
  userIdSelected,
  showModalUpdateUser,
  closeModalUpdateUser,
  handleRefetch,
}: any) => {
  const [formUpdate] = Form.useForm();
  const [selected, setSelected] = useState(0);
  const userData = useQuery({
    queryKey: [userIdSelected, "user-data"],
    queryFn: async () => {
      return await getUserById(userIdSelected);
    },
    enabled: !!userIdSelected,
  });
  const userRole = useQuery({
    queryKey: [userIdSelected, "user-role"],
    queryFn: async () => {
      return await getRoleUserById(userIdSelected);
    },
    enabled: !!userIdSelected,
  });

  const mutationUpdateUser = useMutation({
    mutationFn: () => {
      const body = {
        userName: formUpdate.getFieldValue("username"),
        name: formUpdate.getFieldValue("name"),
        surname: formUpdate.getFieldValue("surname"),
        email: formUpdate.getFieldValue("email"),
        phoneNumber: formUpdate.getFieldValue("phone-number"),
        isActive: formUpdate.getFieldValue("is-active"),
        lockoutEnabled: formUpdate.getFieldValue("lockout-enabled"),
        roleNames: formUpdate.getFieldValue("roles"),
        password: formUpdate.getFieldValue("password"),
      };
      return updateUser(userIdSelected, body);
    },
    onSuccess: async (data: any) => {
      message.success("Update susccessed!");
      handleClose();
      handleRefetch();
    },
    onError: async (error: any) => {
      message.error(error.response.data.error.message);
      handleRefetch();
    },
  });
  const handleClose = () => {
    closeModalUpdateUser();
    setSelected(0);
  };
  return (
    <>
      <Modal
        open={showModalUpdateUser}
        title={"Update user"}
        width={800}
        onOk={() => mutationUpdateUser.mutate()}
        onCancel={handleClose}
        okText={"Update"}
      >
        <div className={styles.modal_wrapper}>
          <FormUpdate
            form={formUpdate}
            data={userData?.data?.data}
            role={userRole?.data?.data}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdate;
