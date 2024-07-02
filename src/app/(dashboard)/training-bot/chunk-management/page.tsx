"use client";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useQuery } from "@tanstack/react-query";
import { Form, Table } from "antd";
import { useState } from "react";
import styles from "./styles/common.module.scss";
import { columnConfig } from "@/app/(dashboard)/training-bot/chunk-management/config";
import HeaderTable from "@/app/(dashboard)/training-bot/chunk-management/components/HeaderTable";
import { getChunkDocuments } from "@/api/chunk-management.api";
import { convertPagination } from "@/utils/convert-pagination";
import { useToggle } from "@/hooks/useToggle";
import ModalCreate from "@/app/(dashboard)/training-bot/chunk-management/components/ModalCreate";
import ModalUpdate from "@/app/(dashboard)/training-bot/chunk-management/components/ModalUpdate";
import ModalDelete from "@/app/(dashboard)/training-bot/chunk-management/components/ModalDelete";
import { IParamsList } from "@/types/common";
const ChunkManagement = () => {
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [form] = Form.useForm();
  const [filterData, setFilterData] = useState<any>({});
  const [keyWordSearch, setKeyWordSearch] = useState({
    search: "",
    seed: null,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-chunk-document", filterData, param, keyWordSearch],

    queryFn: () => {
      const params: IParamsList = convertPagination(param.page, param.size);

      return getChunkDocuments(params);
    },
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.data.items || []);

  const [chunkIdSelected, setChunkIdSelected] = useState(null);

  //create chunk
  const [showModalCreateChunk, , closeModalCreateChunk, openModalCreateChunk] =
    useToggle();
  //update chunk
  const [showModalUpdateChunk, , closeModalUpdateChunk, openModalUpdateChunk] =
    useToggle();
  //delete chunk
  const [showModalDeleteChunk, , closeModalDeleteChunk, openModalDeleteChunk] =
    useToggle();

  const handleRefetch = () => {
    refetch();
  };
  return (
    <>
      <div className={styles.container}>
        <HeaderTable openModalCreateChunk={openModalCreateChunk} />
        <Table
          rowSelection={rowSelection}
          columns={columnConfig({
            setChunkIdSelected,
            openModalUpdateChunk,
            openModalDeleteChunk,
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
            total: data ? data.data?.totalPages * param.size : undefined,
          }}
          onChange={(page: any) =>
            setParam({ ...param, page: page?.current, size: page?.pageSize })
          }
          loading={isFetching}
          rowKey={(record: any) => record.id}
          size={"large"}
          key="id"
        />
      </div>
      <ModalCreate
        showModalCreateChunk={showModalCreateChunk}
        closeModalCreateChunk={closeModalCreateChunk}
        handleRefetch={handleRefetch}
      />
      <ModalUpdate
        chunkIdSelected={chunkIdSelected}
        showModalUpdateChunk={showModalUpdateChunk}
        closeModalUpdateChunk={closeModalUpdateChunk}
        handleRefetch={handleRefetch}
      />
      <ModalDelete
        chunkIdSelected={chunkIdSelected}
        showModalDeleteChunk={showModalDeleteChunk}
        closeModalDeleteChunk={closeModalDeleteChunk}
        handleRefetch={handleRefetch}
      />
    </>
  );
};
export default ChunkManagement;
