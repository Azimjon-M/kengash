import axiosInstance from "./api";

const epLogin = "dj-rest-auth/login/";
const epUser = "users/";

const post = (data) => {
    return axiosInstance.post(epLogin, data);
};

const get = () => axiosInstance.get(epUser);

const loginAPI = {
    post,
    get,
};

export default loginAPI;
