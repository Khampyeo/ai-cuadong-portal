"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled, ReloadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Button, Dropdown, Table } from "antd";
import type { TableProps } from "antd";
import { deleteTenant, getTenants } from "@/api/tenant-management.api";
import TableHeader from "@/app/components/table-header/TableHeader";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useAuth } from "@/contexts/AuthContext";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { GetTenantsInput, TenantDto } from "@/types/tenant";
import { convertPagination } from "@/utils/convert-pagination";
import CreateModal from "./components/CreateModal";
import UpdateModal from "./components/UpdateModal";
import FeaturesModal from "../components/FeaturesManagement/FeaturesModal";
import ListIcon from "@/../public/icon/icon_3dots.svg";
import AddIcon from "@/../public/icon/icon_add__circle.svg";
import EditIcon from "@/../public/icon/icon_edit.svg";

const TenantManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const { modal } = App.useApp();
  const { checkPermission } = useAuth();
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [filterData, setFilterData] = useState<any>({});
  const [keywordSearch, setKeywordSearch] = useState({
    search: "",
    seed: null,
  });

  const allowCreate = checkPermission("AbpTenantManagement.Tenants.Create");
  const allowUpdate = checkPermission("AbpTenantManagement.Tenants.Update");
  const allowDelete = checkPermission("AbpTenantManagement.Tenants.Delete");
  const allowManageFeatures = checkPermission(
    "AbpTenantManagement.Tenants.ManageFeatures"
  );

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-tenants", filterData, param, keywordSearch],

    queryFn: () => {
      const params: GetTenantsInput = convertPagination(
        param.current,
        param.pageSize
      );
      params.sorting = "Name";

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
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.items || []);

  const [isCreateModalOpen, , hideCreateModal, showCreateModal] = useToggle();
  const [isUpdateModalOpen, , hideUpdateModal, showUpdateModal] = useToggle();
  const [isFeaturesModalOpen, , hideFeaturesModal, showFeaturesModal] =
    useToggle();
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

  const onFeaturesModalClose = () => {
    setSelected(undefined);
    hideFeaturesModal();
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
          {allowUpdate && (
            <Button
              type="text"
              size="small"
              icon={<EditIcon />}
              onClick={() => {
                setSelected(record);
                showUpdateModal();
              }}
            ></Button>
          )}
          {allowManageFeatures && (
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setSelected(record);
                showFeaturesModal();
              }}
            >
              Features
            </Button>
          )}
          {allowDelete && (
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
          )}
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
        <TableHeader>
          {allowCreate && (
            <Button type="primary" onClick={showCreateModal}>
              <AddIcon />
              Create
            </Button>
          )}

          <Button type="primary" className="!bg-sky-500" onClick={reloadClick}>
            <ReloadOutlined />
            Reload
          </Button>
        </TableHeader>
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
      {isCreateModalOpen && <CreateModal onClose={onCreateModalClose} />}
      {selected && (
        <>
          {isUpdateModalOpen && (
            <UpdateModal
              onClose={onUpdateModalClose}
              record={selected}
              key={selected.id}
            />
          )}

          {isFeaturesModalOpen && (
            <FeaturesModal
              onClose={onFeaturesModalClose}
              record={selected}
              key={"features-" + selected.id}
            />
          )}
        </>
      )}
    </>
  );
};
export default TenantManagement;
