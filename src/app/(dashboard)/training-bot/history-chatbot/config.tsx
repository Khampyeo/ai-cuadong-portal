import RenderContent from "@/app/components/TextEllipsis/TextEllipsis";
import { timestampToFormattedString } from "@/utils/time-formating";
import { Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";

export const columnConfig = ({}: any) => {
  const arr: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      width: 80,
      ellipsis: {
        showTitle: false,
      },
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          {text}
        </Tooltip>
      ),
    },
    {
      title: "Date",
      dataIndex: "timeSend",
      width: 200,
      render: (record) => (
        <p style={{ margin: 0, whiteSpace: "nowrap" }}>
          {timestampToFormattedString(record)}
        </p>
      ),
    },
    {
      title: "Channel",
      dataIndex: "channel",
      width: 130,
    },
    {
      title: "Question",
      dataIndex: "question",
      width: 230,
      render: (record) => <RenderContent lineNum={3} text={record} />,
    },
    {
      title: "Answer",
      dataIndex: "answer",
      width: 330,
      render: (record) => <RenderContent lineNum={3} text={record} />,
    },
    {
      title: "Language",
      dataIndex: "language",
      width: 130,
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      width: 252,
    },
    {
      title: "Sub purpose",
      dataIndex: "subpurpose",
      width: 252,
    },
    {
      title: "User account",
      dataIndex: "user",
      width: 162,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      width: 162,
    },
  ];
  return arr;
};
