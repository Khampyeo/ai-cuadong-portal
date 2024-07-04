"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Button, Dropdown, Table } from "antd";
import type { TableProps } from "antd";
import ListIcon from "@/../public/icon/icon_3dots.svg";
import AddIcon from "@/../public/icon/icon_add__circle.svg";
import EditIcon from "@/../public/icon/icon_edit.svg";
import { deleteTenant, getTenants } from "@/api/tenant-management.api";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { GetTenantsInput, TenantDto } from "@/types/tenant";
import CreateModal from "./Components/CreateModal";
import UpdateModal from "./Components/UpdateModal";

const TenantManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const { modal } = App.useApp();
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [filterData, setFilterData] = useState<any>({});
  const [keywordSearch, setKeywordSearch] = useState({
    search: "",
    seed: null,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-tenants", filterData, param, keywordSearch],

    queryFn: () => {
      const params: GetTenantsInput = {
        skipCount: (param.page - 1) * param.size,
        maxResultCount: param.size,
      };

      return getTenants(params);
    },
  });

  const mutation = useMutation({
    mutationFn: (record: TenantDto) => {
      return deleteTenant(record.id);
    },
    onSuccess: () => {
      refetch();
    },
    onError: () => {},
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.items || []);

  const [isCreateModalOpen, , hideCreateModal, showCreateModal] = useToggle();
  const [isUpdateModalOpen, , hideUpdateModal, showUpdateModal] = useToggle();
  const [selected, setSelected] = useState<TenantDto>();

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

    hideUpdateModal();
  };

  const onDeleteClick = (record: TenantDto) => {
    modal.confirm({
      title: "Are you sure delete this tenant?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        mutation.mutate(record);
      },
    });
  };

  const columns: TableProps<TenantDto>["columns"] = [
    {
      title: "Tenant Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      align: "center",
      key: "actions",
      fixed: "right",
      width: 150,
      render: (record: TenantDto) => (
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
                  key: "delete",
                  danger: true,
                  label: "Delete Tenant",
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
    setHeaderTitle("Tenant Management");
    return () => {
      setHeaderTitle("");
    };
  }, [setHeaderTitle]);

  return (
    <>
      <div className="table-container">
        <div className="table-header flex my-3">
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
            current: param.page,
            pageSize: param.size,
            pageSizeOptions: APP_PAGE_SIZES,
            showSizeChanger: true,
            hideOnSinglePage: true,
            total: data?.totalCount,
          }}
          onChange={(page: any) =>
            setParam({ ...param, page: page?.current, size: page?.pageSize })
          }
          loading={isFetching}
          rowKey="id"
          size={"large"}
        />
      </div>
      <CreateModal isOpen={isCreateModalOpen} onClose={onCreateModalClose} />
      {selected && (
        <UpdateModal
          isOpen={isUpdateModalOpen}
          onClose={onUpdateModalClose}
          record={selected}
          key={selected.id}
        />
      )}
    </>
  );
};
export default TenantManagement;
