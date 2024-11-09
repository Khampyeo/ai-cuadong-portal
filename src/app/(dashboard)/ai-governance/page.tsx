"use client";

import { useEffect, useState } from "react";
import { Table } from "antd";
import TableHeader from "@/app/components/table-header/TableHeader";
import { APP_PAGE_SIZES, DEFAULT_PARAM } from "@/constants/app";
import { useOnClickCheckboxTable } from "@/hooks/useOnClickCheckboxTable";
import { useHeaderStore } from "@/stores/headerStore";
import { columnConfig } from "./config";
import { mockData } from "./mockData";

const AIGovernance = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);
  const [param, setParam] = useState(DEFAULT_PARAM);

  const data: any = mockData;

  const [rowSelection, currentSelected, setCurrentSelected] =
    useOnClickCheckboxTable(data?.items || []);

  useEffect(() => {
    setHeaderTitle("AI Governance");
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
          dataSource={data}
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
          }}
          onChange={(pagination: any) =>
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
    </>
  );
};
export default AIGovernance;
