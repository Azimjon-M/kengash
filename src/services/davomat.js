import axiosInstance from "./api";

const ep = "davomat/";

// GET DAVOMAT
const get = () => axiosInstance.get(ep);

const davomatApi = {
  get,
};

export default davomatApi;
