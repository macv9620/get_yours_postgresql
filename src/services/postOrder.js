import axios from "axios";
const BASE_URL_ORDER = "http://localhost:9000/orders";
const BASE_URL_ORDER_PRODUCT = "http://localhost:9000/orders/products";

const postOrder = (data, token) => {

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: BASE_URL_ORDER,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  return axios.request(config);
};

const postOrderProducts = (data, token) => {

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: BASE_URL_ORDER_PRODUCT,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        products: data
      },
    };
  
    return axios.request(config);
  };



export { postOrderProducts, postOrder };
