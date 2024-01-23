import axiosInstance from "./api";

const ep = "users/qoshish/";

const post = (data) => axiosInstance.post(ep, data)

const addAzo = {
    post,
};

export default addAzo;