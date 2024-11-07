"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Button, message, Table } from "antd";
import {
  deleteChunkDocument,
  getChunkDocuments,
} from "@/api/chunk-management.api";
import { columnConfig } from "@/app/(dashboard)/training-bot/chunk-management/config";
import TableHeader from "@/app/components/table-header/TableHeader";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { DocumentChunkDto } from "@/types/document-chunk";
import { convertPagination } from "@/utils/convert-pagination";
import ModalCreate from "./components/ModalCreate";
import ModalUpdate from "./components/ModalUpdate";
import AddIcon from "@/../public/icon/icon_add__circle.svg";

const ChunkManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const { modal } = App.useApp();
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [filterData, setFilterData] = useState<any>({});
  const [keyWordSearch, setKeyWordSearch] = useState({
    search: "",
    seed: null,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-chunk-document", filterData, param, keyWordSearch],

    queryFn: () => {
      const params = convertPagination(param.current, param.pageSize);

      return getChunkDocuments(params);
    },
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.items || []);

  const [chunkIdSelected, setChunkIdSelected] = useState<string | undefined>(
    undefined
  );

  const [showModalCreateChunk, , closeModalCreateChunk, openModalCreateChunk] =
    useToggle();
  const [showModalUpdateChunk, , closeModalUpdateChunk, openModalUpdateChunk] =
    useToggle();

  const deleteChunkMutation = useMutation({
    mutationFn: () => {
      if (chunkIdSelected) return deleteChunkDocument(chunkIdSelected);
      else {
        throw new Error("Chunk ID is required to delete chunk.");
      }
    },
    onSuccess: () => {
      message.success("Delete successful!");
      refetch();
    },
  });

  const onEditClick = (record: DocumentChunkDto) => {
    setChunkIdSelected(record.id);
    openModalUpdateChunk();
  };

  const onDeleteClick = (record: DocumentChunkDto) => {
    setChunkIdSelected(record.id);
    modal.confirm({
      title: "Are you sure delete this record?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteChunkMutation.mutate();
      },
    });
  };

  useEffect(() => {
    setHeaderTitle("Chunk Management");
    return () => {
      setHeaderTitle("");
    };
  }, [setHeaderTitle]);

  return (
    <>
      <div>
        <TableHeader>
          <Button type="primary" onClick={openModalCreateChunk}>
            <AddIcon />
            Add Chunk
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
              current: pagination?.current,
              pageSize: pagination?.pageSize,
            })
          }
          loading={isFetching}
          rowKey="id"
          size={"large"}
        />
      </div>
      {showModalCreateChunk && (
        <ModalCreate
          onClose={(success?: boolean) => {
            closeModalCreateChunk();
            if (success) {
              refetch();
            }
          }}
        />
      )}
      {showModalUpdateChunk && chunkIdSelected && (
        <ModalUpdate
          chunkId={chunkIdSelected}
          key={"chunk-" + chunkIdSelected}
          onClose={(success?: boolean) => {
            closeModalUpdateChunk();
            setChunkIdSelected(undefined);
            if (success) {
              refetch();
            }
          }}
        />
      )}
    </>
  );
};
export default ChunkManagement;
