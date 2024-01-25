import axiosInstance from "./api";

const epS = "statistika/";
const epT = "taklif/"

const getS = () => axiosInstance.get(epS);
const getT= () => axiosInstance.get(epT);

const statistikaAPI = { getS, getT };

export default statistikaAPI;