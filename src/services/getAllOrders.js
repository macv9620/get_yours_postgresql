import axios from "axios";
const BASE_URL = "http://localhost:9000/orders/searchAll";

const getAllOrders = (token) => {

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  };

  return axios.request(config);
};

export { getAllOrders };
