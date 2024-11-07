"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table } from "antd";
import { getHistoryChatbot } from "@/api/history-chatbot.api";
import TableHeader from "@/app/components/table-header/TableHeader";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useHeaderStore } from "@/stores/headerStore";
import { columnConfig } from "./config";

const HistoryChatbot = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const [param, setParam] = useState(DEFAULT_PARAM);
  const [filterData, setFilterData] = useState<any>({});
  const [keyWordSearch, setKeyWordSearch] = useState({
    search: "",
    seed: null,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-chats", filterData, param, keyWordSearch],

    queryFn: () => {
      return getHistoryChatbot();
    },
  });

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.items || []);

  useEffect(() => {
    setHeaderTitle("Chatbot History");
    return () => {
      setHeaderTitle("");
    };
  }, [setHeaderTitle]);

  return (
    <>
      <div>
        <TableHeader />
        <Table
          rowSelection={rowSelection}
          columns={columnConfig({})}
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
          onChange={(pagination: any) =>
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
    </>
  );
};
export default HistoryChatbot;
