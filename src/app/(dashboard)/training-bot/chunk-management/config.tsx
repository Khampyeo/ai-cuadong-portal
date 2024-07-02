import RenderContent from "@/app/components/TextEllipsis/TextEllipsis";
import { Button, Dropdown, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import EditIcon from "@/../public/icon/icon_edit.svg";
import ListIcon from "@/../public/icon/icon_3dots.svg";
import styles from "./styles/config.module.scss";
export const columnConfig = ({
  setChunkIdSelected,
  openModalUpdateChunk,
  openModalDeleteChunk,
}: any) => {
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
      width: 110,
      render: (record: any) => (
        <div className={styles.action_wrapper}>
          <Button
            className={styles.button_edit}
            type="text"
            size="small"
            icon={<EditIcon />}
            onClick={() => {
              setChunkIdSelected(record.id);
              openModalUpdateChunk();
            }}
          ></Button>
          <Dropdown
            placement="bottomRight"
            menu={{ items: menuItems({ openModalDeleteChunk }) }}
            trigger={["click"]}
          >
            <Button
              className={styles.button_edit}
              type="text"
              size="small"
              icon={<ListIcon />}
              onClick={() => {
                setChunkIdSelected(record.id);
              }}
            ></Button>
          </Dropdown>
        </div>
      ),
    },
  ];
  return arr;
};
export const menuItems = ({ openModalDeleteChunk }: any) => {
  return [
    {
      key: 2,
      label: (
        <p
          className={styles.dropdown_text}
          onClick={() => openModalDeleteChunk()}
        >
          Delete
        </p>
      ),
    },
  ];
};
