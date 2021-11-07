import React, { createContext, useEffect, useContext, useState } from "react";
import { useFetch } from "../hooks";

const PhotoTypeContext = createContext();

export const PhotoTypeContextProvider = (props) => {
  const [fetchData, doFetchData] = useFetch([]);
  const [photoTypes, setphotoTypes] = useState([]);

  const refreshPhotoTypes = () => {
    doFetchData("photo-types/");
  };

  useEffect(() => {
    refreshPhotoTypes()
  }, []);

  useEffect(() => {
    if (fetchData.data && fetchData.data.length > 0) {
      setphotoTypes([...fetchData.data]);
    }
  }, [fetchData.data]);

  return (
    <PhotoTypeContext.Provider value={{ photoTypes, refreshPhotoTypes }}>
      {props.children}
    </PhotoTypeContext.Provider>
  );
};

export const usePhotoType = () => {
  return useContext(PhotoTypeContext);
};
