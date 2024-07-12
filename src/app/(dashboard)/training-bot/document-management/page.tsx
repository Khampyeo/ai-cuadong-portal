"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { getDocuments } from "@/api/document-management.api";
import { columnConfig } from "@/app/(dashboard)/training-bot/document-management/config";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { convertPagination } from "@/utils/convert-pagination";
import HeaderTable from "./components/HeaderTable";
import ModalCreate from "./components/ModalCreate";
import ModalUpdate from "./components/ModalUpdate";
import styles from "./common.module.scss";

const DocumentManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [filterData, setFilterData] = useState<any>({});
  const [keyWordSearch, setKeyWordSearch] = useState({
    search: "",
    seed: null,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-document", filterData, param, keyWordSearch],

    queryFn: () => {
      const params = convertPagination(param.current, param.pageSize);

      return getDocuments(params);
    },
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.items || []);

  const [documentIdSelected, setDocumentIdSelected] = useState(null);

  //create document
  const [
    showModalCreateDocument,
    ,
    closeModalCreateDocument,
    openModalCreateDocument,
  ] = useToggle();
  //update document
  const [
    showModalUpdateDocument,
    ,
    closeModalUpdateDocument,
    openModalUpdateDocument,
  ] = useToggle();
  //delete document
  const [
    showModalDeleteDocument,
    ,
    closeModalDeleteDocument,
    openModalDeleteDocument,
  ] = useToggle();

  useEffect(() => {
    setHeaderTitle("Document Management");
    return () => {
      setHeaderTitle("");
    };
  }, [setHeaderTitle]);

  return (
    <>
      <div className={styles.container}>
        <HeaderTable openModalCreateDocument={openModalCreateDocument} />
        <Table
          rowSelection={rowSelection}
          columns={columnConfig({
            setDocumentIdSelected,
            openModalUpdateDocument,
            openModalDeleteDocument,
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
      {showModalCreateDocument && (
        <ModalCreate closeModalCreateDocument={closeModalCreateDocument} />
      )}
      {showModalUpdateDocument && (
        <ModalUpdate
          documentId={documentIdSelected}
          showModalUpdateDocument={showModalUpdateDocument}
          closeModalUpdateDocument={closeModalUpdateDocument}
        />
      )}
    </>
  );
};
export default DocumentManagement;
