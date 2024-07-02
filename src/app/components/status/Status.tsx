import { Tag } from "antd";

export const Status = ({ status }: any) => {
  switch (status) {
    case 0:
      return (
        <Tag
          color="#ECFDF3"
          style={{
            color: "#039855",
            fontSize: "14px",
            borderRadius: "20px",
            padding: "4px 10px",
          }}
        >
          Active
        </Tag>
      );
    case 1:
      return (
        <Tag
          color="#FFFAEB"
          style={{
            color: "#E26929",
            fontSize: "14px",
            borderRadius: "20px",
            padding: "4px 10px",
          }}
        >
          Inactive
        </Tag>
      );

    case 2:
      return (
        <Tag
          color="#BDBDBD"
          style={{
            color: "#FFFFFF",
            fontSize: "14px",
            borderRadius: "20px",
            padding: "4px 10px",
          }}
        >
          Draft
        </Tag>
      );
    default:
      return (
        <Tag
          color="rgb(223 235 65)"
          style={{
            color: "#D33F00",
            fontSize: "14px",
            borderRadius: "20px",
            padding: "4px 10px",
          }}
        >
          Error
        </Tag>
      );
  }
};

export default Status;
