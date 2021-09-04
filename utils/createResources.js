import http from "./http-common";
import { createQueryParams } from "./utils";

const createResources = async ({
  resource,
  name,
  successCallback = () => {},
  failCallback = () => {},
}) => {
  const params = createQueryParams({ name });
  try {
    const res = await http.post(`${resource}/?${params}`);
    successCallback();
  } catch (err) {
    failCallback();
  }
};

export default createResources;
