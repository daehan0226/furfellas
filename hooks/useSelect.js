import { useState } from "react";

const useSelect = (placeholder) => {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  return {
    placeholder,
    items,
    setItems,
    selectedItems,
    setSelectedItems,
  };
};

export default useSelect;
