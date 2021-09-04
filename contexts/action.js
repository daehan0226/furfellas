import React, { createContext, useEffect, useContext, useState } from 'react';
import { useFetch } from '../hooks';

const ActionContext = createContext();

export const ActionContextProvider = (props) => {
    const [fetchData, doFetchData] = useFetch([])
    const [actions, setActions] = useState([])

    useEffect(() => {
        doFetchData("actions")
    }, []);

    useEffect(()=>{
        if (fetchData.data && fetchData.data.length > 0) {
            setActions([...fetchData.data])
        }
    }, [fetchData.data])
  
    return (
    <ActionContext.Provider value={{ actions }}>
      {props.children}
    </ActionContext.Provider>
  );
}

export const useAction = () => {
    return useContext(ActionContext);
}