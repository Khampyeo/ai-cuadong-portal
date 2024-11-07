"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Button, Table } from "antd";
import { deleteUser, getUsers } from "@/api/user-management.api";
import { columnConfig } from "@/app/(dashboard)/identity/users/config";
import TableHeader from "@/app/components/table-header/TableHeader";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { UserDto } from "@/types/user";
import { convertPagination } from "@/utils/convert-pagination";
import ModalCreate from "./components/ModalCreate";
import ModalUpdate from "./components/ModalUpdate";
import AddIcon from "@/../public/icon/icon_add__circle.svg";

const UsersManagement = () => {
  const { modal, message } = App.useApp();
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [keywordSearch, setKeywordSearch] = useState({
    search: "",
    seed: null,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-users", param, keywordSearch],

    queryFn: () => {
      const params = convertPagination(param.current, param.pageSize);
      params.sorting = "NormalizedUserName";

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

  const reloadClick = () => {
    refetch();
  };

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
  });

  const onEditClick = (user: UserDto) => {
    setUserIdSelected(user.id);
    showUpdateModal();
  };

  const onDeleteClick = (user: UserDto) => {
    setUserIdSelected(user.id);
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
      <div className="table-container">
        <TableHeader>
          <Button type="primary" onClick={showCreateModal}>
            <AddIcon />
            Create
          </Button>
          <Button type="primary" className="!bg-sky-500" onClick={reloadClick}>
            <ReloadOutlined />
            Reload
          </Button>
        </TableHeader>
        <Table
          rowSelection={rowSelection}
          columns={columnConfig({
            onEditClick,
            onDeleteClick,
          })}
          dataSource={data?.items || []}
          scroll={{
            x: 1400,
            y: 500,
          }}
          pagination={{
            current: param.current,
            pageSize: param.pageSize,
            pageSizeOptions: APP_PAGE_SIZES,
            showSizeChanger: true,
            hideOnSinglePage: true,
            total: data?.totalCount,
          }}
          onChange={(pagination) =>
            setParam({
              ...param,
              current: pagination.current,
              pageSize: pagination.pageSize,
            })
          }
          loading={isFetching}
          rowKey="id"
          size={"large"}
        />
      </div>
      {isCreateModalOpen && (
        <ModalCreate
          onClose={(success?: boolean) => {
            hideCreateModal();
            if (success) {
              refetch();
            }
          }}
        />
      )}
      {isUpdateModalOpen && userIdSelected && (
        <ModalUpdate
          key={"users-" + userIdSelected}
          userId={userIdSelected}
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
