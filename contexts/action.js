import React, { createContext, useEffect, useContext, useState } from "react";
import { useFetch } from "../hooks";

const ActionContext = createContext();

export const ActionContextProvider = (props) => {
  const [fetchData, doFetchData] = useFetch([]);
  const [data, setData] = useState([]);

  const refresh = () => {
    doFetchData("actions/");
  };

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (fetchData.data && fetchData.data.length > 0) {
      setData([...fetchData.data]);
    }
  }, [fetchData.data]);

  return (
    <ActionContext.Provider value={{ data, refresh }}>
      {props.children}
    </ActionContext.Provider>
  );
};

export const useAction = () => {
  return useContext(ActionContext);
};
