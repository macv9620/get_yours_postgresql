import axios from "axios";
const BASE_URL = "http://localhost:9000/brands";

const getBrandsService = () => {

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: BASE_URL,
  };

  return axios.request(config);
};

export { getBrandsService };
