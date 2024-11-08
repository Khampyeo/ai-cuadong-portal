"use client";

import { useEffect } from "react";
import { App, Form, Modal } from "antd";
import { UserDto } from "@/types/user";
import FormUpdate from "./FormUpdate";

type Props = {
  userId: string;
  onClose: (success?: boolean) => void;
};

type UpdateUserInput = {
  roleNames: string[];
} & UserDto;

const ModalUpdate = ({ userId, onClose }: Props) => {
  const { message } = App.useApp();
  const [formUpdate] = Form.useForm<UpdateUserInput>();

  const handleCancel = () => {
    onClose(false);
  };

  const handleSubmit = () => {
    formUpdate.validateFields();
  };

  return (
    <>
      <Modal
        open={true}
        title={"Update user"}
        width={600}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={"Update"}
        maskClosable={false}
      >
        <FormUpdate form={formUpdate} assignableRoles={[]} />
      </Modal>
    </>
  );
};

export default ModalUpdate;
