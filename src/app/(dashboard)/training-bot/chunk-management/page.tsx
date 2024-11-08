"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { App, Button, message, Table } from "antd";
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

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable([]);

  const [chunkIdSelected, setChunkIdSelected] = useState<string | undefined>(
    undefined
  );

  const [showModalCreateChunk, , closeModalCreateChunk, openModalCreateChunk] =
    useToggle();
  const [showModalUpdateChunk, , closeModalUpdateChunk, openModalUpdateChunk] =
    useToggle();

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
      onOk() {},
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
          dataSource={[]}
          scroll={{
            x: 1400,
            y: 500,
          }}
          onChange={(pagination) =>
            setParam({
              ...param,
              current: pagination?.current,
              pageSize: pagination?.pageSize,
            })
          }
          rowKey="id"
          size={"large"}
        />
      </div>
      {showModalCreateChunk && (
        <ModalCreate
          onClose={(success?: boolean) => {
            closeModalCreateChunk();
            if (success) {
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
            }
          }}
        />
      )}
    </>
  );
};
export default ChunkManagement;
