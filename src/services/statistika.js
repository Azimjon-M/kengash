import axiosInstance from "./api";

const epS = "statistika/";
const epT = "taklif/"

const getS = () => axiosInstance.get(epS);
const getT= () => axiosInstance.get(epT);
const del = (id) => axiosInstance.delete(`${epS}${id}/`);

const statistikaAPI = { getS, getT, del };

export default statistikaAPI;