import { useState } from "react";

const useSelect = (placeholder, options) => {
  const [item, setItems] = useState([]);

  return {
    placeholder,
    options,
    selectedItems: item,
    setSelectedItem: setItems,
  };
};

export default useSelect;
