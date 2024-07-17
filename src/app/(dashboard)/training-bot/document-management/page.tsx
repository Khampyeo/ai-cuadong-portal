"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { App, Table } from "antd";
import { getDocuments } from "@/api/document-management.api";
import { columnConfig } from "@/app/(dashboard)/training-bot/document-management/config";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { DocumentDto } from "@/types/document";
import { convertPagination } from "@/utils/convert-pagination";
import HeaderTable from "./components/HeaderTable";
import ModalCreate from "./components/ModalCreate";
import ModalUpdate from "./components/ModalUpdate";

const DocumentManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const { modal } = App.useApp();
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

  const [documentIdSelected, setDocumentIdSelected] = useState<string | null>(
    null
  );

  const [showCreateModal, , closeCreateModal, openCreateModal] = useToggle();
  const [showUpdateModal, , closeUpdateModal, openUpdateModal] = useToggle();

  const onEditClick = (record: DocumentDto) => {
    setDocumentIdSelected(record.id);
    openUpdateModal();
  };

  const onDeleteClick = (record: DocumentDto) => {
    setDocumentIdSelected(record.id);
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
    setHeaderTitle("Document Management");
    return () => {
      setHeaderTitle("");
    };
  }, [setHeaderTitle]);

  return (
    <>
      <div>
        <HeaderTable openModalCreateDocument={openCreateModal} />
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
      {showCreateModal && (
        <ModalCreate closeModalCreateDocument={closeCreateModal} />
      )}
      {showUpdateModal && (
        <ModalUpdate
          documentId={documentIdSelected}
          showModalUpdateDocument={showUpdateModal}
          closeModalUpdateDocument={closeUpdateModal}
        />
      )}
    </>
  );
};
export default DocumentManagement;
