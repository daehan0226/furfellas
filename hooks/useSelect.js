import { useState } from "react";

const useSelect = (placeholder) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const getSelectedIds = () => {
    const ids = selectedItems.map((item) => item.id);
    return ids.join(",");
  };

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
