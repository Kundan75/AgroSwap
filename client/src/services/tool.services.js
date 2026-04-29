import api from "../Api/Api";

export const CreateToolService = async (data) => {
  const token = localStorage.getItem("token");

  const res = await api.post("/tool/createtool", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getAllTools = async() => {
    const res = await api.get("/tool/getalltools" );
    return res.data;
};

export const getUserTools = async () => {
  const token = localStorage.getItem("token");

  const res = await api.get("/tool/getusertools", {
    headers: {
      Authorization: `Bearer ${token}`, // 🔒 required
    },
  });

  return res.data;
};