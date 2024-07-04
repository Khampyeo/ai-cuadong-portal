import { Button, Dropdown } from "antd";
import { ColumnsType } from "antd/es/table";
import RenderContent from "@/app/components/TextEllipsis/TextEllipsis";
import ListIcon from "@/../public/icon/icon_3dots.svg";
import EditIcon from "@/../public/icon/icon_edit.svg";
import styles from "./styles/config.module.scss";

export const columnConfig = ({
  setUserIdSelected,
  showUpdateModal,
  showDeleteModal,
}: any) => {
  const arr: ColumnsType<any> = [
    {
      title: "Username",
      dataIndex: "userName",
      width: 240,
      render: (item) => <RenderContent text={item} />,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 350,
      render: (item) => <RenderContent text={item} lineNum={4} />,
    },
    {
      title: "Surname",
      dataIndex: "surname",
      width: 130,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 130,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      width: 130,
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      width: 202,
    },
    {
      title: "Last Password Change Time",
      dataIndex: "lastPasswordChangeTime",
      width: 162,
      sorter: true,
    },
    {
      title: "Last Modification Time",
      dataIndex: "lastModificationTime",
      width: 162,
      sorter: true,
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
      width: 162,
      sorter: true,
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
              setUserIdSelected(record.id);
              showUpdateModal();
            }}
          ></Button>
          <Dropdown
            placement="bottomRight"
            menu={{ items: menuItems({ showDeleteModal }) }}
            trigger={["click"]}
          >
            <Button
              className={styles.button_edit}
              type="text"
              size="small"
              icon={<ListIcon />}
              onClick={() => {
                setUserIdSelected(record.id);
              }}
            ></Button>
          </Dropdown>
        </div>
      ),
    },
  ];
  return arr;
};

export const menuItems = ({ showDeleteModal }: any) => {
  return [
    {
      key: 2,
      label: (
        <p className={styles.dropdown_text} onClick={() => showDeleteModal()}>
          Delete
        </p>
      ),
    },
  ];
};
