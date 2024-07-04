"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Form, Table } from "antd";
import { getDocuments } from "@/api/document-management.api";
import HeaderTable from "@/app/(dashboard)/training-bot/document-management/components/HeaderTable";
import ModalCreate from "@/app/(dashboard)/training-bot/document-management/components/ModalCreate";
import ModalDelete from "@/app/(dashboard)/training-bot/document-management/components/ModalDelete";
import ModalUpdate from "@/app/(dashboard)/training-bot/document-management/components/ModalUpdate";
import { columnConfig } from "@/app/(dashboard)/training-bot/document-management/config";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { IParamsList } from "@/types/common";
import { convertPagination } from "@/utils/convert-pagination";
import styles from "./common.module.scss";

const DocumentManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [form] = Form.useForm();
  const [filterData, setFilterData] = useState<any>({});
  const [keyWordSearch, setKeyWordSearch] = useState({
    search: "",
    seed: null,
  });

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["list-document", filterData, param, keyWordSearch],

    queryFn: () => {
      const params: IParamsList = convertPagination(param.page, param.size);

      return getDocuments(params);
    },
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.data?.items || []);

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
          dataSource={data?.data?.items || []}
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
            total: data?.totalCount,
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
        showModalCreateDocument={showModalCreateDocument}
        closeModalCreateDocument={closeModalCreateDocument}
      />
      <ModalUpdate
        documentIdSelected={documentIdSelected}
        showModalUpdateDocument={showModalUpdateDocument}
        closeModalUpdateDocument={closeModalUpdateDocument}
      />
      <ModalDelete
        documentIdSelected={documentIdSelected}
        showModalDeleteDocument={showModalDeleteDocument}
        closeModalDeleteDocument={closeModalDeleteDocument}
      />
    </>
  );
};
export default DocumentManagement;
