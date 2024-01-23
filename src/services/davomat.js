import axiosInstance from "./api";

const ep = "davomat/";

// GET DAVOMAT
const get = () => axiosInstance.get(ep);

// PUT Davomat
const updateDavomat = (davomat) => {
  const { id } = davomat;
  return axiosInstance.put(`${ep}${id}/`, { ...davomat, aktiv: false });
};

const davomatApi = {
  get,
  updateDavomat,
};

export default davomatApi;
