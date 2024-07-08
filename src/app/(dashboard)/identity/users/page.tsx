"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, message, Table } from "antd";
import { deleteUser, getUsers } from "@/api/user-management.api";
import { columnConfig } from "@/app/(dashboard)/identity/users/config";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { IParamsList } from "@/types/common";
import { PaginationType } from "@/types/pagination.type";
import { convertPagination } from "@/utils/convert-pagination";
import HeaderTable from "./Components/HeaderTable";
import ModalCreate from "./Components/ModalCreate";
import ModalUpdate from "./Components/ModalUpdate";

const UsersManagement = () => {
  const { modal } = App.useApp();
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const [param, setParam] = useState<PaginationType>(DEFAULT_PARAM);
  const [keywordSearch, setKeywordSearch] = useState({
    search: "",
    seed: null,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-users", param, keywordSearch],

    queryFn: () => {
      const params: IParamsList = convertPagination(param.page, param.size);

      return getUsers(params);
    },
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.items || []);

  const [userIdSelected, setUserIdSelected] = useState<string | undefined>(
    undefined
  );

  const [isCreateModalOpen, , hideCreateModal, showCreateModal] = useToggle();
  const [isUpdateModalOpen, , hideUpdateModal, showUpdateModal] = useToggle();

  const deleteUserMutation = useMutation({
    mutationFn: () => {
      if (userIdSelected) return deleteUser(userIdSelected);
      else {
        throw new Error("User ID is required to delete user.");
      }
    },
    onSuccess: () => {
      message.success("Delete successful!");
      refetch();
    },
    onError: () => {
      message.error("Delete failed!");
    },
  });

  const onDeleteClick = () => {
    modal.confirm({
      title: "Are you sure delete this user?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteUserMutation.mutate();
      },
    });
  };

  useEffect(() => {
    setHeaderTitle("Users");
    return () => {
      setHeaderTitle("");
    };
  }, [setHeaderTitle]);

  return (
    <>
      <div className="table-container bg-white rounded-lg">
        <HeaderTable openModalCreateUser={showCreateModal} />
        <Table
          rowSelection={rowSelection}
          columns={columnConfig({
            setUserIdSelected,
            showUpdateModal,
            onDeleteClick,
          })}
          dataSource={data?.items || []}
          scroll={{
            x: 1400,
            y: 500,
          }}
          pagination={{
            current: param.page,
            pageSize: param.size,
            pageSizeOptions: APP_PAGE_SIZES,
            showSizeChanger: true,
            hideOnSinglePage: true,
            total: data?.totalCount,
          }}
          onChange={(pagination: { current?: number; pageSize?: number }) =>
            setParam({
              ...param,
              page: pagination?.current ?? param.page,
              size: pagination?.pageSize ?? param.size,
            })
          }
          loading={isFetching}
          rowKey="id"
          size={"large"}
        />
      </div>
      <ModalCreate
        isOpen={isCreateModalOpen}
        onClose={(success?: boolean) => {
          hideCreateModal();
          setUserIdSelected(undefined);
          if (success) {
            refetch();
          }
        }}
      />
      {userIdSelected && (
        <ModalUpdate
          key={"users-" + userIdSelected}
          userId={userIdSelected}
          isOpen={isUpdateModalOpen}
          onClose={(success?: boolean) => {
            hideUpdateModal();
            setUserIdSelected(undefined);

            if (success) {
              refetch();
            }
          }}
        />
      )}
    </>
  );
};
export default UsersManagement;
