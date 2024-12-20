"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { App, Button, Dropdown, Table } from "antd";
import type { TableProps } from "antd";
import TableHeader from "@/app/components/table-header/TableHeader";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { RoleDto } from "@/types/role";
import CreateModal from "./components/CreateModal";
import PermissionsModal from "./components/PermissionsModal";
import UpdateModal from "./components/UpdateModal";
import { mockData } from "./mockData";
import ListIcon from "@/../public/icon/icon_3dots.svg";
import AddIcon from "@/../public/icon/icon_add__circle.svg";
import EditIcon from "@/../public/icon/icon_edit.svg";

const RoleManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const { modal } = App.useApp();
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [keywordSearch, setKeywordSearch] = useState({
    search: "",
    seed: null,
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable([]);

  const [isCreateModalOpen, , hideCreateModal, showCreateModal] = useToggle();
  const [isUpdateModalOpen, , hideUpdateModal, showUpdateModal] = useToggle();
  const [isPermissionsModalOpen, , hidePermissionsModal, showPermissionsModal] =
    useToggle();
  const [selected, setSelected] = useState<RoleDto>();

  const reloadClick = () => {};

  const onCreateModalClose = (success?: boolean) => {
    hideCreateModal();
  };

  const onUpdateModalClose = (success?: boolean) => {
    setSelected(undefined);
    hideUpdateModal();
  };

  const onPermissionsClick = (record: RoleDto) => {
    setSelected(record);
    showPermissionsModal();
  };

  const onPermissionsModalClose = () => {
    setSelected(undefined);
    hidePermissionsModal();
  };

  const onDeleteClick = (record: RoleDto) => {
    modal.confirm({
      title: "Are you sure delete this role?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {},
    });
  };

  const columns: TableProps<RoleDto>["columns"] = [
    {
      title: "Role Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Default",
      dataIndex: "isDefault",
      key: "isDefault",
      width: "120px",
    },
    {
      title: "Public",
      dataIndex: "isPublic",
      key: "isPublic",
      width: "120px",
    },
    {
      title: "Actions",
      align: "center",
      key: "actions",
      fixed: "right",
      width: 120,
      render: (record: RoleDto) => (
        <div className="flex gap-5 justify-center">
          <Button
            type="text"
            size="small"
            icon={<EditIcon />}
            onClick={() => {
              setSelected(record);
              showUpdateModal();
            }}
          ></Button>
          <Dropdown
            placement="bottomRight"
            menu={{
              items: [
                {
                  key: "permissions",
                  label: "Permissions",
                  onClick: () => onPermissionsClick(record),
                },
                {
                  key: "delete",
                  danger: true,
                  label: "Delete",
                  onClick: () => onDeleteClick(record),
                },
              ],
            }}
            trigger={["click"]}
          >
            <Button type="text" size="small" icon={<ListIcon />}></Button>
          </Dropdown>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setHeaderTitle("Roles");
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
          columns={columns}
          dataSource={mockData}
          onChange={(pagination) =>
            setParam({
              ...param,
              current: pagination?.current,
              pageSize: pagination?.pageSize,
            })
          }
          loading={false}
          rowKey="id"
          size={"large"}
        />
      </div>
      {isCreateModalOpen && <CreateModal onClose={onCreateModalClose} />}
      {selected && (
        <>
          {isUpdateModalOpen && (
            <UpdateModal
              key={"roles-" + selected.id}
              onClose={onUpdateModalClose}
              record={selected}
            />
          )}
          {isPermissionsModalOpen && (
            <PermissionsModal
              key={"permissions-" + selected.id}
              onClose={onPermissionsModalClose}
              record={selected}
            />
          )}
        </>
      )}
    </>
  );
};
export default RoleManagement;
