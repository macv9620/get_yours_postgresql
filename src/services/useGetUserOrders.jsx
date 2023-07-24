import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../Context/ContextAuthProvider";
import { useAppContext } from "../Context/ContextAppProvider";

const BASE_URL = 'http://localhost:9000/orders/search'

const useGetUserOrders = () => {
const[updateUserOrders, setUpdateUserOrders]=useState(false)
const {user, token} = useAuthContext()
const{setOrders, setRenderLoadingSpinner} = useAppContext()
  useEffect(() => {
      if(updateUserOrders || user){
        setRenderLoadingSpinner(true);
 
        let data = JSON.stringify({
          "id": user.id
        })
  
        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: BASE_URL,
          headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          data : data
        };
  
        axios.request(config)
          .then((res) => {
            console.log(res)
            if(res.data.data.result === 'NO-ORDERS'){
              setRenderLoadingSpinner(false);
              setOrders([])
              setUpdateUserOrders(null)
              console.log('Usuario sin ordenes')
            } else if(res.data.data.result === 'ORDERS'){
              setRenderLoadingSpinner(false);
              setOrders(res.data.data.userInfo)
              setUpdateUserOrders(null)
              console.log('Ordenes de usuario', res.data.data.userInfo)
            }
          })
          .catch((err) => {
            console.log(err);
            setRenderLoadingSpinner(false);
            setUpdateUserOrders(null)
          });
      }

  }, [updateUserOrders, user]);

  return { setUpdateUserOrders };
};

export { useGetUserOrders };
