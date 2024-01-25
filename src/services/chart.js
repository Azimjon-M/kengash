import axiosInstance from "./api";

const ep = "taklif/";

const get = (id) => {
    return axiosInstance.get(`${ep}${id}/`);
};

const chartAPI = { get };

export default chartAPI;
