import http from "./http-common";

const deleteResources = async ({
  id,
  resource,
  successCallback = () => {},
  failCallback = () => {},
}) => {
  try {
    const res = await http.delete(`${resource}/${id}`);
    successCallback();
  } catch (err) {
    failCallback();
  }
};

export default deleteResources;
