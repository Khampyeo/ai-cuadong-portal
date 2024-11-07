"use client";

import { useEffect } from "react";
import { ReloadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "antd";
import { getTalkingTrainedModel } from "@/api/ai-receptionist.api";
import TableHeader from "@/app/components/table-header/TableHeader";
import { useHeaderStore } from "@/stores/headerStore";
import { columnConfig } from "./config";

const ModelsManagement = () => {
  const setHeaderTitle = useHeaderStore((state) => state.setHeaderTitle);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["list-models"],

    queryFn: () => {
      return getTalkingTrainedModel();
    },
  });

  const reloadClick = () => {
    refetch();
  };

  useEffect(() => {
    setHeaderTitle("Model Management");
    return () => {
      setHeaderTitle("");
    };
  }, [setHeaderTitle]);

  return (
    <>
      <div className="table-container">
        <TableHeader>
          <Button type="primary" className="!bg-sky-500" onClick={reloadClick}>
            <ReloadOutlined />
            Reload
          </Button>
        </TableHeader>
        <Table
          columns={columnConfig({})}
          dataSource={data}
          loading={isFetching}
          rowKey="id"
          size={"large"}
        />
      </div>
    </>
  );
};
export default ModelsManagement;
