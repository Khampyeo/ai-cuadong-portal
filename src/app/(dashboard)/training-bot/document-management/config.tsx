import RenderContent from "@/app/components/TextEllipsis/TextEllipsis";
import { Button, Dropdown, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import EditIcon from "@/../public/icon/icon_edit.svg";
import ListIcon from "@/../public/icon/icon_3dots.svg";
import styles from "./styles/config.module.scss";
import Status from "@/app/components/status/Status";
import moment from "moment";
export const columnConfig = ({
  setDocumentIdSelected,
  openModalUpdateDocument,
  openModalDeleteDocument,
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
      render: (date) => (date ? moment(date).format("DD-MM-YYYY, HH:mm") : ""),
    },
    {
      title: "Last modified date",
      dataIndex: "lastModificationTime",
      width: 202,
      render: (date) => (date ? moment(date).format("DD-MM-YYYY, HH:mm") : ""),
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
      render: (record: any) => (
        <div className={styles.action_wrapper}>
          <Button
            className={styles.button_edit}
            type="text"
            size="small"
            icon={<EditIcon />}
            onClick={() => {
              setDocumentIdSelected(record.id);
              openModalUpdateDocument();
            }}
          ></Button>
          <Dropdown
            placement="bottomRight"
            menu={{ items: menuItems({ openModalDeleteDocument }) }}
            trigger={["click"]}
          >
            <Button
              className={styles.button_edit}
              type="text"
              size="small"
              icon={<ListIcon />}
              onClick={() => {
                setDocumentIdSelected(record.id);
              }}
            ></Button>
          </Dropdown>
        </div>
      ),
    },
  ];
  return arr;
};

export const menuItems = ({ openModalDeleteDocument }: any) => {
  return [
    {
      key: 2,
      label: (
        <p
          className={styles.dropdown_text}
          onClick={() => openModalDeleteDocument()}
        >
          Delete
        </p>
      ),
    },
  ];
};
