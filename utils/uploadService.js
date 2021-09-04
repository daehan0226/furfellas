import http from "./http-common";

const uploadService = async ({
  file,
  types,
  actions,
  locations,
  description,
  successCallback,
  failCallback,
}) => {
  let formData = new FormData();

  formData.append("file", file);
  formData.append("types", types);
  formData.append("actions", actions);
  formData.append("locations", locations);
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
