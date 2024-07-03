"use client";
import { useEffect, useState } from "react";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useQuery } from "@tanstack/react-query";
import { Form, Table } from "antd";
import { columnConfig } from "./config";
import HeaderTable from "./components/HeaderTable";
import { getHistoryChatbot } from "@/api/history-chatbot.api";
import { useHeaderStore } from "@/stores/headerStore";
import styles from "./common.module.scss";

const HistoryChatbot = () => {
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
      return getHistoryChatbot();
    },
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.data.items || []);

  const [questionSelected, setQuestionSelected] = useState(null);

  useEffect(() => {
    setHeaderTitle("Chatbot History");
    return () => {
      setHeaderTitle("");
    };
  }, [setHeaderTitle]);

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
