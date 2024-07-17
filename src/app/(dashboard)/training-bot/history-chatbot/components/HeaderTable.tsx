import { Button, Input } from "antd";
import ExportIcon from "@/../public/icon/icon_export.svg";
import SearchIcon from "@/../public/icon/icon_search.svg";

const HeaderTable = () => {
  return (
    <div className="flex justify-between mb-3">
      <div>
        <Input
          maxLength={255}
          prefix={<SearchIcon />}
          placeholder="Search"
          size="middle"
        />
      </div>
      <div className="flex gap-5">
        <Button>
          <ExportIcon />
          Export data
        </Button>
      </div>
    </div>
  );
};

export default HeaderTable;
