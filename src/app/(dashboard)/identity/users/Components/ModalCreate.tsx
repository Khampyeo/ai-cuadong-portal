"use client";
import { useMutation } from "@tanstack/react-query";
import { Form, Input, message, Modal } from "antd";
import styles from "../styles/modal-create.module.scss";
import FormCreate from "./FormCreate";
import { createUser } from "@/api/users-management.api";
import { useState } from "react";

const ModalCreate = ({
  showModalCreateUser,
  closeModalCreateUser,
  handleRefetch,
}: any) => {
  const [formAdd] = Form.useForm();
  const [selected, setSelected] = useState(0);

  const mutationAddUser = useMutation({
    mutationFn: () => {
      const body = {
        userName: formAdd.getFieldValue("username"),
        name: formAdd.getFieldValue("name"),
        surname: formAdd.getFieldValue("surname"),
        email: formAdd.getFieldValue("email"),
        phoneNumber: formAdd.getFieldValue("phone-number"),
        isActive: formAdd.getFieldValue("is-active"),
        lockoutEnabled: formAdd.getFieldValue("lockout-enabled"),
        roleNames: formAdd.getFieldValue("roles"),
        password: formAdd.getFieldValue("password"),
      };
      return createUser(body);
    },
    onSuccess: async (data: any) => {
      message.success("Create susccessed!");
      closeModalCreateUser();
      handleRefetch();
    },
    onError: async (error: any) => {
      message.error(error.response.data.error.message);
      closeModalCreateUser();
    },
  });

  const handleClose = () => {
    closeModalCreateUser();
    setSelected(0);
  };
  return (
    <>
      <Modal
        open={showModalCreateUser}
        title={"New user"}
        width={600}
        onOk={() => mutationAddUser.mutate()}
        onCancel={handleClose}
        okText={"Create"}
        maskClosable={false}
      >
        <div className={styles.modal_wrapper}>
          <FormCreate
            form={formAdd}
            selected={selected}
            setSelected={setSelected}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalCreate;
