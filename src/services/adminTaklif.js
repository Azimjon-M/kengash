import axiosInstance from "./api";

const ep = "taklif/";

const get = () => axiosInstance.get(ep)
const put = (id, item) => {
    return axiosInstance.put(`${ep}${id}/`, {...item})
}
const del = (id) => {
    return axiosInstance.delete(`${ep}${id}/`)
}

const adminTaklif = { get, put, del}

export default adminTaklif;