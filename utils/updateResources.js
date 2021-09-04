import http from "./http-common";
import { createQueryParams } from "./utils";

const updateResources = async ({
  id,
  resource,
  name,
  successCallback = () => {},
  failCallback = () => {},
}) => {
  const params = createQueryParams({ name });
  try {
    const res = await http.put(`${resource}/${id}?${params}`);
    successCallback();
  } catch (err) {
    failCallback();
  }
};

export default updateResources;
