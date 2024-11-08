"use client";

import { App, Form, Modal } from "antd";
import { UserDto } from "@/types/user";
import FormCreate from "./FormCreate";

type Props = {
  onClose: (success?: boolean) => void;
};

const ModalCreate = ({ onClose }: Props) => {
  const { message } = App.useApp();
  const [formAdd] = Form.useForm<UserDto>();

  const handleCancel = () => {
    onClose();
  };

  const handleSubmit = () => {
    formAdd.validateFields();
  };

  return (
    <>
      <Modal
        open={true}
        title={"New user"}
        width={600}
        onOk={handleSubmit}
        onCancel={handleCancel}
        okText={"Create"}
        maskClosable={false}
      >
        <FormCreate form={formAdd} assignableRoles={[]} />
      </Modal>
    </>
  );
};

export default ModalCreate;
