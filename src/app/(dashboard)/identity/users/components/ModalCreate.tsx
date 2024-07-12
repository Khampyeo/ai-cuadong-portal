"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Form, Modal } from "antd";
import { createUser, getAssignableRoles } from "@/api/user-management.api";
import { UserDto } from "@/types/user";
import FormCreate from "./FormCreate";

type Props = {
  onClose: (success?: boolean) => void;
};

const ModalCreate = ({ onClose }: Props) => {
  const { message } = App.useApp();
  const [formAdd] = Form.useForm<UserDto>();

  const createUserMutation = useMutation({
    mutationFn: (values: UserDto) => {
      return createUser(values);
    },
    onSuccess: () => {
      message.success("Create successful!");
      formAdd.resetFields();
      onClose(true);
    },
  });

  const assignableRoles = useQuery({
    queryKey: ["assignable-roles"],
    queryFn: async () => {
      return await getAssignableRoles();
    },
  });

  const handleCancel = () => {
    formAdd.resetFields();
    onClose();
  };

  const handleSubmit = () => {
    formAdd
      .validateFields()
      .then((values) => createUserMutation.mutate(values));
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
        confirmLoading={createUserMutation.isPending}
        loading={assignableRoles.isFetching}
      >
        <FormCreate
          form={formAdd}
          assignableRoles={assignableRoles?.data || []}
        />
      </Modal>
    </>
  );
};

export default ModalCreate;
