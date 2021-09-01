import Cookies from "universal-cookie";
import { server } from "../config";

const checkIfSessionExists = () => {
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  if (session) {
    return true;
  } else {
    return false;
  }
};

export const setHeaders = () => {
  const headers = { "Content-Type": "application/json" };
  const cookies = new Cookies();
  const session = cookies.get("EID_SES");
  if (session) {
    headers["Authorization"] = session;
  }
  return headers;
};
