"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Form, Modal } from "antd";
import {
  getAssignableRoles,
  getUserById,
  getUserRoles,
  updateUser,
} from "@/api/user-management.api";
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

  const userData = useQuery({
    queryKey: ["user-data", userId],
    queryFn: async () => {
      return await getUserById(userId);
    },
    enabled: !!userId,
  });

  const userRoles = useQuery({
    queryKey: ["user-roles", userId],
    queryFn: async () => {
      return await getUserRoles(userId);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (values: UserDto) => {
      return updateUser(userId, values);
    },
    onSuccess: () => {
      message.success("Update successful!");
      onClose(true);
    },
  });

  const assignableRoles = useQuery({
    queryKey: ["assignable-roles"],
    queryFn: async () => {
      return await getAssignableRoles();
    },
  });

  useEffect(() => {
    if (userData.data) {
      formUpdate.setFieldsValue({
        ...userData.data,
        roleNames: userRoles.data?.items.map((item) => item.name),
      });
    }
  }, [userData, formUpdate, userRoles]);

  const handleCancel = () => {
    onClose(false);
  };

  const handleSubmit = () => {
    formUpdate
      .validateFields()
      .then((values) => updateUserMutation.mutate(values));
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
        loading={
          userData.isFetching ||
          userRoles.isFetching ||
          assignableRoles.isFetching
        }
        confirmLoading={updateUserMutation.isPending}
      >
        <FormUpdate
          form={formUpdate}
          assignableRoles={assignableRoles?.data || []}
        />
      </Modal>
    </>
  );
};

export default ModalUpdate;
