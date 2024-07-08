"use client";

import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Form, message, Modal } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { AxiosError } from "axios";
import {
  getAssignableRoles,
  getUserById,
  getUserRoles,
  updateUser,
} from "@/api/user-management.api";
import { RoleDto } from "@/types/role";
import { UserDto } from "@/types/user.type";
import FormUpdate from "./FormUpdate";
import styles from "../styles/modal-update.module.scss";

interface Props {
  userId: string | undefined;
  isOpen: boolean;
  onClose: (success?: boolean) => void;
}

const ModalUpdate = ({ userId, isOpen, onClose }: Props) => {
  const [formUpdate] = Form.useForm();
  const userData = useQuery({
    queryKey: [userId, "user-data"],
    queryFn: async () => {
      if (userId) return await getUserById(userId);
      else {
        throw new Error("User ID is required to get data of user.");
      }
    },
    enabled: !!userId,
  });

  const userRole = useQuery({
    queryKey: [userId, "user-role"],
    queryFn: async () => {
      if (userId) return await getUserRoles(userId);
      else {
        throw new Error("User ID is required to get role of user.");
      }
    },
    enabled: !!userId,
  });

  const updateUserMutation = useMutation({
    mutationFn: (values: UserDto) => {
      if (userId) return updateUser(userId, values);
      else {
        throw new Error("User ID is required to update user.");
      }
    },
    onSuccess: async () => {
      message.success("Update successful!");
      handleCloseModal(true);
    },
    onError: async (
      error: AxiosError<{
        error: AnyObject;
      }>
    ) => {
      if (error.response?.data?.error?.message) {
        message.error(error.response.data.error.message);
      } else {
        message.error("Failed to update user");
      }
    },
  });

  const listRoles = useQuery({
    queryKey: ["list-roles"],
    queryFn: async () => {
      return await getAssignableRoles();
    },
  });

  useEffect(() => {
    if (userData.data && userRole.data) {
      formUpdate.setFieldsValue({
        ...userData.data.data,
        roles: userRole.data.data.items.map((item: RoleDto) => item.name),
      });
    }
  }, [userData, formUpdate, userRole]);

  const handleCloseModal = (success?: boolean) => {
    onClose(success);
    formUpdate.resetFields();
  };

  return (
    <>
      <Modal
        open={isOpen}
        title={"Update user"}
        width={800}
        onOk={() =>
          formUpdate
            .validateFields()
            .then((values: UserDto) => updateUserMutation.mutate(values))
        }
        onCancel={() => handleCloseModal()}
        okText={"Update"}
        loading={userData.isFetching || userRole.isFetching}
        confirmLoading={updateUserMutation.isPending}
      >
        <div className={styles.modal_wrapper}>
          {userId && (
            <FormUpdate form={formUpdate} listRoles={listRoles?.data || []} />
          )}
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdate;
