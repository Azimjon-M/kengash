import axiosInstance from "./api";

const ep = "taklif/";
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
const del = (id) => {
  return axiosInstance.delete(`${ep}${id}/`)
}

// GET BAXO
const voteCheckGet = () => axiosInstance.get(ep + "baxo/");

const taklifApi = {
  get,
  end,
  vote,
  voteCheckGet,
  del
};

export default taklifApi;
