"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { App, Button, Table } from "antd";
import { columnConfig } from "@/app/(dashboard)/identity/users/config";
import TableHeader from "@/app/components/table-header/TableHeader";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { UserDto } from "@/types/user";
import ModalCreate from "./components/ModalCreate";
import ModalUpdate from "./components/ModalUpdate";
import { mockData } from "./mockData";
import AddIcon from "@/../public/icon/icon_add__circle.svg";

const UsersManagement = () => {
  const { modal, message } = App.useApp();
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [keywordSearch, setKeywordSearch] = useState({
    search: "",
    seed: null,
  });

  const data: any = [];

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.items || []);

  const [userIdSelected, setUserIdSelected] = useState<string | undefined>(
    undefined
  );

  const [isCreateModalOpen, , hideCreateModal, showCreateModal] = useToggle();
  const [isUpdateModalOpen, , hideUpdateModal, showUpdateModal] = useToggle();

  const reloadClick = () => {};

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
      onOk() {},
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
          dataSource={mockData}
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
          }}
          onChange={(pagination) =>
            setParam({
              ...param,
              current: pagination.current,
              pageSize: pagination.pageSize,
            })
          }
          rowKey="id"
          size={"large"}
        />
      </div>
      {isCreateModalOpen && (
        <ModalCreate
          onClose={(success?: boolean) => {
            hideCreateModal();
            if (success) {
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
            }
          }}
        />
      )}
    </>
  );
};
export default UsersManagement;
