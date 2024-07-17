import { Button, Dropdown } from "antd";
import { ColumnsType } from "antd/es/table";
import RenderContent from "@/app/components/TextEllipsis/TextEllipsis";
import { UserDto } from "@/types/user";
import { formatDateTime } from "@/utils/time-formating";
import ListIcon from "@/../public/icon/icon_3dots.svg";
import EditIcon from "@/../public/icon/icon_edit.svg";

type Props = {
  onEditClick: (record: UserDto) => void;
  onDeleteClick: (record: UserDto) => void;
};

export const columnConfig = ({ onEditClick, onDeleteClick }: Props) => {
  const columns: ColumnsType<UserDto> = [
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
      render: (value) => {
        return formatDateTime(value);
      },
    },
    {
      title: "Last Modification Time",
      dataIndex: "lastModificationTime",
      width: 162,
      sorter: true,
      render: (value) => {
        return formatDateTime(value);
      },
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
      width: 162,
      sorter: true,
      render: (value) => {
        return formatDateTime(value);
      },
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
            onClick={() => onEditClick(record)}
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
          >
            <Button type="text" size="small" icon={<ListIcon />}></Button>
          </Dropdown>
        </div>
      ),
    },
  ];
  return columns;
};
