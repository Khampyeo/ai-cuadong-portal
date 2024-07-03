"use client";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useQuery } from "@tanstack/react-query";
import { Form, Table } from "antd";
import { useState } from "react";
import styles from "./common.module.scss";
import { columnConfig } from "./config";
import HeaderTable from "./components/HeaderTable";
import { getHistoryChatbot } from "@/api/history-chatbot.api";

const HistoryChatbot = () => {
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
      return getHistoryChatbot();
    },
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.data.items || []);

  const [questionSelected, setQuestionSelected] = useState(null);

  return (
    <>
      <div className={styles.container}>
        <HeaderTable />
        <Table
          rowSelection={rowSelection}
          columns={columnConfig({})}
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
    </>
  );
};
export default HistoryChatbot;