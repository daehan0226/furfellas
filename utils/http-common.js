import axios from "axios";
import Cookies from "universal-cookie";
import { server } from "../config";

export const setHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  if (session) {
    headers["Authorization"] = session;
  }
  return headers;
};

const httpClient = axios.create({
  baseURL: `${server}/api/`,
});

httpClient.interceptors.request.use(function (config) {
  config.headers = setHeaders()
  return config;
});


export default httpClient