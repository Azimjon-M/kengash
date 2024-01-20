import axiosInstance from "./api";

const ep = "taklif/";
const davomat = "davomat/";
// GET TAKLI
const get = () => axiosInstance.get(ep);

// PUT TAKLIF
const end = (taklif) => {
  const { id } = taklif;
  return axiosInstance.put(`${ep}${id}/`, { ...taklif, tugash: true });
};

// POST BAXO
const vote = (body) => {
  const user_id = localStorage.getItem("user_id");
  return axiosInstance.post(ep + "baxo/", { ...body, user_id });
};

// GET BAXO
const voteCheckGet = () => axiosInstance.get(ep + "baxo/");

// GET DAVOMAT
const getDav = () => axiosInstance.get(davomat);

const taklifApi = {
  get,
  end,
  vote,
  voteCheckGet,
  getDav,
};

export default taklifApi;
