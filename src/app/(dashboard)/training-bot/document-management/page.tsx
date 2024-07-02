"use client";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useQuery } from "@tanstack/react-query";
import { Form, Table } from "antd";
import { useState } from "react";
import styles from "./common.module.scss";
import { columnConfig } from "@/app/(dashboard)/training-bot/document-management/config";
import HeaderTable from "@/app/(dashboard)/training-bot/document-management/components/HeaderTable";
import { getDocuments } from "@/api/document-management.api";
import ModalCreate from "@/app/(dashboard)/training-bot/document-management/components/ModalCreate";
import { useToggle } from "@/hooks/useToggle";
import { convertPagination } from "@/utils/convert-pagination";
import ModalUpdate from "@/app/(dashboard)/training-bot/document-management/components/ModalUpdate";
import ModalDelete from "@/app/(dashboard)/training-bot/document-management/components/ModalDelete";
import { IParamsList } from "@/types/common";

const DocumentManagement = () => {
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
