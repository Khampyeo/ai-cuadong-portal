import { PropsWithChildren, ReactNode } from "react";
import { Input } from "antd";
import SearchIcon from "@/../public/icon/icon_search.svg";

type Props = { allowSearch?: boolean } & PropsWithChildren;

const TableHeader = ({ children, allowSearch }: Props) => {
  return (
    <div className="table-header flex mb-3">
      <div className="">
        {allowSearch && (
          <Input
            maxLength={255}
            prefix={<SearchIcon />}
            placeholder="Search..."
            size="middle"
          />
        )}
      </div>
      <div className="flex-1 flex justify-end gap-3">{children}</div>
    </div>
  );
};

export default TableHeader;
