import { Button, Dropdown, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import RenderContent from "@/app/components/TextEllipsis/TextEllipsis";
import { formatDateTime } from "@/utils/time-formating";
import ListIcon from "@/../public/icon/icon_3dots.svg";
import EditIcon from "@/../public/icon/icon_edit.svg";

export const columnConfig = ({}: any) => {
  const columns: ColumnsType<any> = [
    {
      title: "Task ID",
      dataIndex: "task_id",
      width: 120,
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
      title: "Timestamp",
      dataIndex: "timestamp",
      width: 200,
      render: (record) => (
        <p style={{ margin: 0, whiteSpace: "nowrap" }}>
          {formatDateTime(record)}
        </p>
      ),
    },
    {
      title: "Model ID",
      dataIndex: "model_id",
      width: 150,
    },
    {
      title: "User ID",
      dataIndex: "user_id",
      width: 130,
    },
    {
      title: "Department",
      dataIndex: "department",
      width: 180,
    },
    {
      title: "Task Type",
      dataIndex: "task_type",
      width: 180,
    },
    {
      title: "Completion Rate (%)",
      dataIndex: "completion_rate",
      width: 180,
      render: (record) => <RenderContent lineNum={1} text={record} />,
    },
    {
      title: "Accuracy (%)",
      dataIndex: "accuracy",
      width: 180,
    },
    {
      title: "Latency (ms)",
      dataIndex: "latency_ms",
      width: 180,
    },
    {
      title: "Resource Usage",
      dataIndex: "resource_usage",
      width: 180,
    },
    {
      title: "Error Rate (%)",
      dataIndex: "error_rate",
      width: 180,
    },
    {
      title: "Ethics Score",
      dataIndex: "ethics_score",
      width: 180,
    },
    {
      title: "Bias Score",
      dataIndex: "bias_score",
      width: 180,
    },
    {
      title: "Fairness Rating",
      dataIndex: "fairness_rating",
      width: 180,
    },
    {
      title: "Privacy Score",
      dataIndex: "privacy_score",
      width: 180,
    },
    {
      title: "GDPR Compliant",
      dataIndex: "gdpr_compliant",
      width: 180,
    },
    {
      title: "Data Quality",
      dataIndex: "data_quality",
      width: 180,
    },
    {
      title: "User Satisfaction",
      dataIndex: "user_satisfaction",
      width: 180,
    },
    {
      title: "Alerts",
      dataIndex: "alerts",
      width: 180,
    },
    {
      title: "Review Status",
      dataIndex: "review_status",
      width: 180,
    },
    {
      title: "Actions",
      align: "center",
      key: "actions",
      fixed: "right",
      width: 150,
      render: (record) => (
        <div className="flex gap-5 justify-center">
          <Button
            type="text"
            size="small"
            icon={<EditIcon />}
            onClick={() => {
              // Handle edit click
            }}
          ></Button>
          <Dropdown
            placement="bottomRight"
            menu={{
              items: [
                {
                  key: "permissions",
                  label: "Permissions",
                  onClick: () => {
                    // Handle permissions click
                  },
                },
                {
                  key: "delete",
                  danger: true,
                  label: "Delete",
                  onClick: () => {
                    // Handle delete click
                  },
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
