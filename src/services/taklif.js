import axiosInstance from "./api";

const ep = 'taklif/'

const get = () => axiosInstance.get(ep)

const end = (taklif) => axiosInstance.put(ep, {...taklif, tugash: true})

const vote = (body) => {
    const user_id = localStorage.getItem("user_id");
    return axiosInstance.post(ep + 'baxo/', {...body, user_id})
}

const voteCheck = () =>  axiosInstance.get(ep + 'baxo/')

const taklifApi = {
    get,
    end,
    vote,
    voteCheck
}

export default  taklifApi