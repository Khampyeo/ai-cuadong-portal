import { ColumnsType } from "antd/es/table";
import RenderContent from "@/app/components/TextEllipsis/TextEllipsis";
import { TrainingModelDto } from "@/types/generative-ai";

type Props = {};

export const columnConfig = ({}: Props) => {
  const columns: ColumnsType<TrainingModelDto> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 120,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 350,
      render: (item) => <RenderContent text={item} lineNum={4} />,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 130,
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      fixed: "right",
      width: 110,
      render: (_, record) => <div className=""></div>,
    },
  ];
  return columns;
};
