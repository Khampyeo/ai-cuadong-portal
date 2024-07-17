import { Button, Input } from "antd";
import AddIcon from "@/../public/icon/icon_add__circle.svg";
import ImportIcon from "@/../public/icon/icon_import.svg";
import SearchIcon from "@/../public/icon/icon_search.svg";

const HeaderTable = ({ openModalCreateDocument }: any) => {
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
          <ImportIcon />
          Import
        </Button>
        <Button type="primary" onClick={openModalCreateDocument}>
          <AddIcon />
          Add Document
        </Button>
      </div>
    </div>
  );
};

export default HeaderTable;
