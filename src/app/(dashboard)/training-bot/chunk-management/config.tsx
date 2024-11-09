import { Button, Dropdown, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import RenderContent from "@/app/components/TextEllipsis/TextEllipsis";
import { DocumentChunkDto } from "@/types/document-chunk";
import ListIcon from "@/../public/icon/icon_3dots.svg";
import EditIcon from "@/../public/icon/icon_edit.svg";

type Props = {
  onEditClick: (record: DocumentChunkDto) => void;
  onDeleteClick: (record: DocumentChunkDto) => void;
};

export const columnConfig = ({ onEditClick, onDeleteClick }: Props) => {
  const columns: ColumnsType<DocumentChunkDto> = [
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
      title: "Status",
      dataIndex: "status",
      width: 130,
    },
    {
      title: "Language",
      dataIndex: "language",
      width: 130,
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <div className="flex gap-5 justify-center">
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
          >
            <Button type="text" size="small" icon={<ListIcon />}></Button>
          </Dropdown>
        </div>
      ),
    },
  ];
  return columns;
};
