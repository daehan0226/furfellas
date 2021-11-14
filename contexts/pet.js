import React, { createContext, useEffect, useContext, useState } from "react";
import { useFetch } from "../hooks";

const PetContext = createContext();

export const PetContextProvider = (props) => {
  const [fetchData, doFetchData] = useFetch([]);
  const [data, setData] = useState([]);

  const refresh = () => {
    doFetchData("pets/");
  };

  useEffect(() => {
    refresh()
  }, []);

  useEffect(() => {
    if (fetchData.data && fetchData.data.length > 0) {
      setData([...fetchData.data]);
    }
  }, [fetchData.data]);

  return (
    <PetContext.Provider value={{ data, refresh }}>
      {props.children}
    </PetContext.Provider>
  );
};

export const usePet = () => {
  return useContext(PetContext);
};
