import React, { createContext, useEffect, useContext, useState } from "react";
import { useFetch } from "../hooks";

const PhotoTypeContext = createContext();

export const PhotoTypeContextProvider = (props) => {
  const [fetchData, doFetchData] = useFetch([]);
  const [data, setData] = useState([]);

  const refresh = () => {
    doFetchData("photo-types/");
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
    <PhotoTypeContext.Provider value={{ data, refresh }}>
      {props.children}
    </PhotoTypeContext.Provider>
  );
};

export const usePhotoType = () => {
  return useContext(PhotoTypeContext);
};
