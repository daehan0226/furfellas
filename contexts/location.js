import React, { createContext, useEffect, useState, useContext } from "react";
import { useFetch } from "../hooks";

const LocationContext = createContext();

export const LocationContextProvider = (props) => {
  const [fetchData, doFetchData] = useFetch([]);
  const [data, setData] = useState([]);

  const refresh = () => {
    doFetchData("locations/");
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
    <LocationContext.Provider value={{ data, refresh }}>
      {props.children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
