import React, { createContext, useEffect, useState, useContext } from "react";
import { useFetch } from "../hooks";

const LocationContext = createContext();

export const LocationContextProvider = (props) => {
  const [fetchData, doFetchData] = useFetch([]);
  const [locations, setLocations] = useState([]);

  const refreshLocations = () => {
    doFetchData("locations/");
  };

  useEffect(() => {
    refreshLocations();
  }, []);

  useEffect(() => {
    if (fetchData.data && fetchData.data.length > 0) {
      setLocations([...fetchData.data]);
    }
  }, [fetchData.data]);

  return (
    <LocationContext.Provider value={{ locations, refreshLocations }}>
      {props.children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  return useContext(LocationContext);
};
