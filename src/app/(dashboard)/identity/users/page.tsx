"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { getUsers } from "@/api/users-management.api";
import { columnConfig } from "@/app/(dashboard)/identity/users/config";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { IParamsList } from "@/types/common";
import { convertPagination } from "@/utils/convert-pagination";
import HeaderTable from "./Components/HeaderTable";
import ModalCreate from "./Components/ModalCreate";
import ModalDelete from "./Components/ModalDelete";
import ModalUpdate from "./Components/ModalUpdate";

const UsersManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
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
            hideOnSinglePage: true,
            total: data?.data.totalCount,
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
