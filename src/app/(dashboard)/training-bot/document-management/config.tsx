import { Button, Dropdown, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Status from "@/app/components/status/Status";
import RenderContent from "@/app/components/TextEllipsis/TextEllipsis";
import { DocumentDto } from "@/types/document";
import { formatDateTime } from "@/utils/time-formating";
import ListIcon from "@/../public/icon/icon_3dots.svg";
import EditIcon from "@/../public/icon/icon_edit.svg";

type Props = {
  onEditClick: (record: DocumentDto) => void;
  onDeleteClick: (record: DocumentDto) => void;
};

export const columnConfig = ({ onEditClick, onDeleteClick }: Props) => {
  const columns: ColumnsType<DocumentDto> = [
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
      dataIndex: "name",
      width: 240,
      render: (item) => <RenderContent text={item} />,
    },
    {
      title: "Category",
      dataIndex: "category",
      width: 130,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 130,
      render: (status) => <Status status={Number(status)} />,
    },
    {
      title: "Source",
      dataIndex: "relatedLink",
      width: 163,
    },
    {
      title: "Language",
      dataIndex: "language",
      width: 130,
    },
    {
      title: "Created date",
      dataIndex: "creationTime",
      width: 176,
      render: (date) => formatDateTime(date),
    },
    {
      title: "Last modified date",
      dataIndex: "lastModificationTime",
      width: 202,
      render: (date) => formatDateTime(date),
    },
    {
      title: "Creator",
      dataIndex: "creatorId",
      width: 162,
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
      title: "Last modified by",
      dataIndex: "lastModifierId",
      width: 162,
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
      title: "Action",
      align: "center",
      key: "action",
      fixed: "right",
      width: 110,
      render: (_, record) => (
        <div className="flex gap-5 justify-center">
          <Button
            type="text"
            size="small"
            icon={<EditIcon />}
            onClick={() => {
              onEditClick(record);
            }}
          ></Button>
          <Dropdown
            placement="bottomRight"
            menu={{
              items: [
                {
                  key: "delete",
                  danger: true,
                  label: "Delete",
                  onClick: () => onDeleteClick(record),
                },
              ],
            }}
            trigger={["click"]}
          >
            <Button type="text" size="small" icon={<ListIcon />}></Button>
          </Dropdown>
        </div>
      ),
    },
  ];
  return columns;
};
