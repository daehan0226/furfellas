import { useState, useEffect } from "react";

const useSelect = (placeholder, optionContext) => {
  const { data } = optionContext();
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const getSelectedIds = () => {
    const ids = selectedItems.map((item) => item.id);
    return ids.join(",");
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setItems([...data]);
    }
  }, [data]);

  return {
    placeholder,
    items,
    setItems,
    selectedItems,
    setSelectedItems,
    getSelectedIds,
  };
};

export default useSelect;
