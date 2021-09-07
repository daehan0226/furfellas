import { useState, useEffect } from "react";

const useInput = (placeholder = "", initValue = "") => {
  const [value, onChange] = useState(initValue);
  const [msg, setMsg] = useState("");

  return [
    {
      value,
      onChange,
      placeholder,
    },
    msg,
    setMsg,
  ];
};

export default useInput;
