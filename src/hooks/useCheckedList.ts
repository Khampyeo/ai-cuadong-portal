import { useCallback, useState } from "react";

const useCheckedList = (initialValues?: string[]) => {
  const [checkedList, setCheckedList] = useState<string[]>(initialValues || []);

  const addItems = useCallback((items: string[]) => {
    setCheckedList((prevList) => {
      const newList = [...prevList];
      items.forEach((item) => {
        if (!newList.includes(item)) {
          newList.push(item);
        }
      });
      return newList;
    });
  }, []);

  const removeItems = useCallback((items: string[]) => {
    setCheckedList((prevList) =>
      prevList.filter((item) => !items.includes(item))
    );
  }, []);

  const toggleItem = useCallback((item: string) => {
    setCheckedList((prevList) => {
      if (prevList.includes(item)) {
        return prevList.filter((i) => i !== item);
      } else {
        return [...prevList, item];
      }
    });
  }, []);

  return { checkedList, addItems, removeItems, toggleItem };
};

export default useCheckedList;
