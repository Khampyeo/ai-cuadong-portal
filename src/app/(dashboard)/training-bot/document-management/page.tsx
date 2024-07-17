"use client";

import { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { App, Button, message, Table } from "antd";
import { deleteDocument, getDocuments } from "@/api/document-management.api";
import { columnConfig } from "@/app/(dashboard)/training-bot/document-management/config";
import TableHeader from "@/app/components/table-header/TableHeader";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useToggle } from "@/hooks/useToggle";
import { useHeaderStore } from "@/stores/headerStore";
import { DocumentDto } from "@/types/document";
import { convertPagination } from "@/utils/convert-pagination";
import ModalCreate from "./components/ModalCreate";
import ModalUpdate from "./components/ModalUpdate";
import AddIcon from "@/../public/icon/icon_add__circle.svg";

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

  const [documentIdSelected, setDocumentIdSelected] = useState<
    string | undefined
  >(undefined);

  const [showCreateModal, , closeCreateModal, openCreateModal] = useToggle();
  const [showUpdateModal, , closeUpdateModal, openUpdateModal] = useToggle();

  const deleteDocumentMutation = useMutation({
    mutationFn: () => {
      if (documentIdSelected) return deleteDocument(documentIdSelected);
      else {
        throw new Error("Document ID is required to delete document.");
      }
    },
    onSuccess: () => {
      message.success("Delete successful!");
      refetch();
    },
  });

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
      onOk() {
        deleteDocumentMutation.mutate();
      },
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
        <TableHeader>
          <Button type="primary" onClick={openCreateModal}>
            <AddIcon />
            Add Document
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
      {showCreateModal && (
        <ModalCreate
          onClose={(success?: boolean) => {
            closeCreateModal();
            if (success) {
              refetch();
            }
          }}
        />
      )}
      {showUpdateModal && documentIdSelected && (
        <ModalUpdate
          key={"document-" + documentIdSelected}
          documentId={documentIdSelected}
          onClose={(success?: boolean) => {
            closeUpdateModal();
            setDocumentIdSelected(undefined);
            if (success) {
              refetch();
            }
          }}
        />
      )}
    </>
  );
};
export default DocumentManagement;
