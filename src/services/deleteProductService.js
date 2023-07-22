import axios from "axios";
const BASE_URL = "http://localhost:9000/items";

const deleteProductService = (id, token) => {
  let data = JSON.stringify({ id });

  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  return axios.request(config);
};

export { deleteProductService };
