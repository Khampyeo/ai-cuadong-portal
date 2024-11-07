import { useState } from "react";

export const useOnClickCheckboxTable = <T extends Record<string, any>>(
  dataList: any[],
  keyItem: any = "id"
) => {
  const [currentSelected, setCurrentSelected] = useState<any[]>([]);
  const rowSelection = {
    selectedRowKeys: currentSelected.map((it: any) => it[keyItem]),
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      const newData = currentSelected.concat(
        selectedRows.filter(
          (it: T) =>
            !currentSelected
              ?.map((it: any) => it[keyItem])
              ?.includes(it[keyItem])
        )
      );
      const unCheckedList = dataList
        .map((it: T) => it[keyItem])
        .filter((it: any) => !selectedRowKeys?.includes(it));

      const finalData = newData.filter(
        (it: T) => !unCheckedList?.includes(it[keyItem])
      );

      setCurrentSelected(finalData);
    },
  };
  return [rowSelection, currentSelected, setCurrentSelected] as [
    typeof rowSelection,
    typeof currentSelected,
    typeof setCurrentSelected,
  ];
};
