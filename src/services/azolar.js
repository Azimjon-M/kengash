import axiosInstance from "./api";

const ep = "users/";
// GET AZOLAR
const get = () => axiosInstance.get(ep);

const del = (id) => {
    return axiosInstance.delete(`${ep}delete/${id}/`)
}

const azolarApi = {
  get,
  del,
};

export default azolarApi;
