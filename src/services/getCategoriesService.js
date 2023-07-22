import axios from "axios";
const BASE_URL = "http://localhost:9000/categories";

const getCategoriesService = () => {

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: BASE_URL,
  };

  return axios.request(config);
};

export { getCategoriesService };
