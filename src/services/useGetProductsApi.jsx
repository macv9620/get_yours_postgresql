import { useEffect, useState } from "react";
import axios from "axios";

const useGetProductsApi = (setRenderLoadingSpinner, setRenderErrorPage) => {
  const [products, setProducts] = useState(null);
  const [updateProducts, setUpdateProducts] = useState(true)
  useEffect(() => {

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:9000/items',
      headers: { }
    };

    if(updateProducts){
      setRenderLoadingSpinner(true);
      axios.request(config)
        .then((products) => {
          console.log('Request Get Produts')
          console.log(products)
          setRenderLoadingSpinner(false);
          setProducts(products.data)
          setUpdateProducts(null)
        })
        .catch((err) => {
          setRenderErrorPage(true)
          console.log(err);
          setRenderLoadingSpinner(false);
          setUpdateProducts(null)
        });
    }
  }, [updateProducts]);

  return { products, setUpdateProducts };
};

export { useGetProductsApi };
