// addTaklif.js
import axiosInstance from "./api";

const ep = "taklif/";

const post = (data) => axiosInstance.post(ep, data);

const addTaklif = {
  post,
};

export default addTaklif;
