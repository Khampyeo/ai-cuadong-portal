"use client";
import { useState } from "react";
import { App, Button, Table } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { ExclamationCircleFilled, ReloadOutlined } from "@ant-design/icons";
import AddIcon from "@/../public/icon/icon_add__circle.svg";
import { columnConfig } from "@/app/(dashboard)/identity/users/config";
import { convertPagination } from "@/utils/convert-pagination";
import { getUsers } from "@/api/users-management.api";
import HeaderTable from "./Components/HeaderTable";
import ModalCreate from "./Components/ModalCreate";
import ModalUpdate from "./Components/ModalUpdate";
import ModalDelete from "./Components/ModalDelete";
import { IParamsList } from "@/types/common";

const UsersManagement = () => {
  const { modal } = App.useApp();
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [filterData, setFilterData] = useState<any>({});
  const [keywordSearch, setKeywordSearch] = useState({
    search: "",
    seed: null,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-users", filterData, param, keywordSearch],

    queryFn: () => {
      const params: IParamsList = convertPagination(param.page, param.size);

      return getUsers(params);
    },
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.data?.items || []);

  const [userIdSelected, setUserIdSelected] = useState(null);

  const [isCreateModalOpen, , hideCreateModal, showCreateModal] = useToggle();
  const [isUpdateModalOpen, , hideUpdateModal, showUpdateModal] = useToggle();
  const [isDeleteModalOpen, , hideDeleteModal, showDeleteModal] = useToggle();

  const handleRefetch = () => {
    refetch();
    setUserIdSelected(null);
  };
  return (
    <>
      <div className="table-container bg-white rounded-lg">
        <HeaderTable openModalCreateUser={showCreateModal} />
        <Table
          rowSelection={rowSelection}
          columns={columnConfig({
            setUserIdSelected,
            showUpdateModal,
            showDeleteModal,
          })}
          dataSource={data?.data.items || []}
          scroll={{
            x: 1400,
            y: 500,
          }}
          pagination={{
            current: param.page,
            pageSize: param.size,
            pageSizeOptions: APP_PAGE_SIZES,
            showSizeChanger: true,
            hideOnSinglePage: false,
            total: data?.data.totalPages,
          }}
          onChange={(page: any) =>
            setParam({ ...param, page: page?.current, size: page?.pageSize })
          }
          loading={isFetching}
          rowKey="id"
          size={"large"}
        />
      </div>
      <ModalCreate
        showModalCreateUser={isCreateModalOpen}
        closeModalCreateUser={hideCreateModal}
        handleRefetch={handleRefetch}
      />
      <ModalUpdate
        userIdSelected={userIdSelected}
        showModalUpdateUser={isUpdateModalOpen}
        closeModalUpdateUser={hideUpdateModal}
        handleRefetch={handleRefetch}
      />
      <ModalDelete
        userIdSelected={userIdSelected}
        showModalDeleteUser={isDeleteModalOpen}
        closeModalDeleteUser={hideDeleteModal}
        handleRefetch={handleRefetch}
      />
    </>
  );
};
export default UsersManagement;