import RenderContent from "@/components/TextEllipsis/TextEllipsis";
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
      title: "Document name",
      dataIndex: "document_name",
      width: 240,
      render: (item) => <RenderContent text={item} />,
    },
    {
      title: "Content",
      dataIndex: "content",
      width: 350,
      render: (item) => <RenderContent text={item} lineNum={4} />,
    },
    {
      title: "Category",
      dataIndex: "path",
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 130,
    },
    {
      title: "Source",
      dataIndex: "source",
      width: 163,
    },
    {
      title: "Language",
      dataIndex: "language",
      width: 130,
    },
    {
      title: "Created date",
      dataIndex: "create_date",
      width: 176,
    },
    {
      title: "Published date",
      dataIndex: "published_date",
      width: 202,
    },
    {
      title: "Region",
      dataIndex: "scope",
      width: 162,
    },
    {
      title: "Creator",
      dataIndex: "creator",
      width: 162,
      sorter: true,
    },
  ];
  return arr;
};
