"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Button, Dropdown, Table } from "antd";
import type { TableProps } from "antd";
import { deleteRole, getRoles } from "@/api/role-management.api";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { GetRolesInput, RoleDto } from "@/types/role";
import { convertPagination } from "@/utils/convert-pagination";
import CreateModal from "./Components/CreateModal";
import PermissionsModal from "./Components/PermissionsModal";
import UpdateModal from "./Components/UpdateModal";
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

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-roles", param, keywordSearch],

    queryFn: () => {
      const params: GetRolesInput = convertPagination(
        param.current,
        param.pageSize
      );
      params.sorting = "NormalizedName";

      return getRoles(params);
    },
  });

  const mutation = useMutation({
    mutationFn: (record: RoleDto) => {
      return deleteRole(record.id);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.items || []);

  const [isCreateModalOpen, , hideCreateModal, showCreateModal] = useToggle();
  const [isUpdateModalOpen, , hideUpdateModal, showUpdateModal] = useToggle();
  const [isPermissionsModalOpen, , hidePermissionsModal, showPermissionsModal] =
    useToggle();
  const [selected, setSelected] = useState<RoleDto>();

  const reloadClick = () => {
    refetch();
  };

  const onCreateModalClose = (success?: boolean) => {
    if (success) {
      refetch();
    }

    hideCreateModal();
  };

  const onUpdateModalClose = (success?: boolean) => {
    if (success) {
      refetch();
    }

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
      onOk() {
        mutation.mutate(record);
      },
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
                  label: "Delete Role",
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
        <div className="table-header flex mb-3">
          <div></div>
          <div className="flex-1 flex justify-end gap-3">
            <Button type="primary" onClick={showCreateModal}>
              <AddIcon />
              Create
            </Button>
            <Button
              type="primary"
              className="!bg-sky-500"
              onClick={reloadClick}
            >
              <ReloadOutlined />
              Reload
            </Button>
          </div>
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data?.items || []}
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
              current: pagination?.current,
              pageSize: pagination?.pageSize,
            })
          }
          loading={isFetching}
          rowKey="id"
          size={"large"}
        />
      </div>
      <CreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      {selected && (
        <>
          {isUpdateModalOpen && (
            <UpdateModal
              isOpen={isUpdateModalOpen}
              onClose={onUpdateModalClose}
              record={selected}
              key={"roles-" + selected.id}
            />
          )}
          {isPermissionsModalOpen && (
            <PermissionsModal
              isOpen={isPermissionsModalOpen}
              onClose={onPermissionsModalClose}
              record={selected}
              key={"permissions-" + selected.id}
            />
          )}
        </>
      )}
    </>
  );
};
export default RoleManagement;
