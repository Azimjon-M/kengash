import axiosInstance from "./api";

const ep = "davomat/";

// GET DAVOMAT
const get = () => axiosInstance.get(ep);

// PUT Davomat
const updateDavomat = (id, davomat) => {
  return axiosInstance.put(`${ep}${id}/`, davomat);
};

const davomatApi = {
  get,
  updateDavomat,
};

export default davomatApi;
