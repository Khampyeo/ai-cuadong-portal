"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Form, Modal } from "antd";
import { createUser, getAssignableRoles } from "@/api/user-management.api";
import { UserDto } from "@/types/user";
import FormCreate from "./FormCreate";
import styles from "../styles/modal-create.module.scss";

interface Props {
  isOpen: boolean;
  onClose: (success?: boolean) => void;
}
const ModalCreate = ({ isOpen, onClose }: Props) => {
  const { message } = App.useApp();
  const [formAdd] = Form.useForm();

  const createUsermutation = useMutation({
    mutationFn: (values: UserDto) => {
      return createUser(values);
    },
    onSuccess: async () => {
      message.success("Create successful!");
      formAdd.resetFields();
      onClose(true);
    },
  });

  const listRoles = useQuery({
    queryKey: ["list-roles"],
    queryFn: async () => {
      return await getAssignableRoles();
    },
  });

  const handleCloseModal = () => {
    formAdd.resetFields();
    onClose();
  };

  return (
    <>
      <Modal
        open={isOpen}
        title={"New user"}
        width={600}
        onOk={() =>
          formAdd
            .validateFields()
            .then((values: UserDto) => createUsermutation.mutate(values))
        }
        onCancel={handleCloseModal}
        okText={"Create"}
        confirmLoading={createUsermutation.isPending}
        maskClosable={false}
      >
        <div className={styles.modal_wrapper}>
          <FormCreate form={formAdd} listRoles={listRoles?.data || []} />
        </div>
      </Modal>
    </>
  );
};

export default ModalCreate;
