import http from "./http-common";

const uploadService = async ({
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
  formData.append("type", type);
  formData.append("actions", actions);
  formData.append("location", location);
  formData.append("description", description);

  try {
    const res = await http.post(`photos/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successCallback();
  } catch (err) {
    console.log(err);
    failCallback();
  }
};

export default uploadService;
