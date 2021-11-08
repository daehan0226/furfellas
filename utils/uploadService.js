import { setHeaders } from "./apis";
import http from "./http-common";

const uploadService = async ({
  id,
  file,
  type,
  actions,
  location,
  description,
  successCallback,
  failCallback,
}) => {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("type_id", type);
  formData.append("action_ids", actions);
  formData.append("location_id", location);
  formData.append("description", description);

  try {
    const headers = setHeaders()
    if (id) {
      const res = await http.put(`photos/${id}`, formData, {
        headers,
      });
    }
    const res = await http.post(`photos/`, formData, {
      headers,
    });
    successCallback();
  } catch (err) {
    console.log(err);
    failCallback();
  }
};

export default uploadService;
