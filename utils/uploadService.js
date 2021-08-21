import http from "./http-common";

const uploadService = async ({
  file,
  type,
  action,
  successCallback,
  failCallback,
}) => {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("type", type);
  formData.append("action", action);

  try {
    const res = await http.post("/photos", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    successCallback();
  } catch {
    failCallback();
  }
};

export default uploadService;
