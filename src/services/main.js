// mainApi.js
import axiosInstance from "./api";

const ep = "taklif/menyu/";

// GET MAIN DATA
const get = () => axiosInstance.get(ep);

const mainApi = {
  get,
};

export default mainApi;
