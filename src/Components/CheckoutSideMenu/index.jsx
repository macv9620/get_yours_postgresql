import { Link } from "react-router-dom";
import { useAppContext } from "../../Context/ContextAppProvider";
import { totalCartPrice } from "../../utils";
import { Close } from "../Icons/Close";
import { OrderCard } from "../OrderCard";
import "./CheoutSideMenu.css";
import { useAuthContext } from "../../Context/ContextAuthProvider";
import NoMatches from "../NoMatches/NoMatches";
import { usePostOrder } from "../../services/usePostOrder";
import { useState } from "react";
import { postOrder, postOrderProducts } from "../../services/postOrder";
import { useGetUserOrders } from "../../services/useGetUserOrders";

const CheckoutSideMenu = () => {

  const { setRenderLoadingSpinner, setShowModalMessage, setModalMessageToShow, closeSideCheckoutMenu, showCheckoutSide, cartItems, setCartItems, openSideCheckoutMenu } =
    useAppContext();

    const{setUpdateUserOrders}=useGetUserOrders()

  const {token, user} = useAuthContext()

  
  const orderToAdd = ()=> {
    setRenderLoadingSpinner(true)
    const currentDate = new Date(Date.now())
    const formatedDate = currentDate.toISOString()
    
    const dataToPost = {
      userId: user.id,
      date: formatedDate
    }



    postOrder(dataToPost, token)
    .then(res => {
      console.log(res)
      if(res.status === 201){
        const productsToPost = cartItems.map((product)=> {
          console.log('Orden creada')
          return {
            orderId: res.data.data.id,
            productId: product.id,
            productQ: product.productQuantity
          }
        })
        console.log(productsToPost)
        postOrderProducts(productsToPost, token)
        .then(res =>{
          setRenderLoadingSpinner(false)
          console.log(res)
          console.log('Productos asociados correctamente')
          setShowModalMessage(true) 
          setModalMessageToShow({
            message: 'Order created successfully',
            type: 'success'
          })
          setUpdateUserOrders(true)
        })
        .catch(err=>{
          setRenderLoadingSpinner(false)
          console.log(err)
          setShowModalMessage(true) 
          setModalMessageToShow({
            message: 'Network problems, please try again in a moment',
            type: 'error'
          })
        })
      }
    })
    .catch(err => {
      console.log(err)
      setRenderLoadingSpinner(false)
      setShowModalMessage(true) 
      setModalMessageToShow({
        message: 'Network problems, please try again in a moment',
        type: 'error'
      })
    })

    setCartItems([])
    openSideCheckoutMenu()
  }

  const isCartItemsEmpty = ()=>{
    if(cartItems.length === 0){
      return true
    }
  }

    return (
      <aside className={showCheckoutSide
      ? "checkout-side-menu fixed right-0 border border-black rounded bg-white"
      : "hide-checkout fixed right-0 border border-black rounded bg-white"
      }>

        <div className="cart-header flex justify-between items-center p-6">
          <h2 className="font-medium text-xl">Cart</h2>
          <div className="cursor-pointer" onClick={closeSideCheckoutMenu}>
            <Close />
          </div>
        </div>

        {isCartItemsEmpty() && (
          <NoMatches message={"No items added yet ¡let's add!"}/>
        )}
        {!isCartItemsEmpty() && (
          <div className="cart-item px-6 flex-1">
          {cartItems.map((item, index) => {
            return (
              <OrderCard
                key={index}
                productCheckout={item}
              />
            );
          })}
        </div>
        )}

          <div className="cart-footer px-6">
            <p className="flex justify-between items-center my-0">
              <span className="font-light">Total: </span>
              <span className="font-medium text-2xl">$ {totalCartPrice(cartItems)}</span>
            </p>

            {(token && !isCartItemsEmpty()) && (
              <Link to={`/`}>
                <button
                className="w-full bg-black py-2 text-white rounded-lg"
                onClick={orderToAdd}>
                  Confirm order
                </button>
            </Link>
            )}

            {(token && isCartItemsEmpty()) && (
              <Link to='./'>
                <button
                className="w-full bg-black py-2 text-white rounded-lg"
                onClick={closeSideCheckoutMenu}>
                  See products
                </button>
            </Link>
            )}

            {(!token && isCartItemsEmpty()) && (
              <Link to={`./`}>
                <button
                className="w-full bg-black py-2 text-white rounded-lg"
                onClick={closeSideCheckoutMenu}>
                  See products
                </button>
            </Link>
            )}

            {(!token && !isCartItemsEmpty()) && (
              <Link to={`./log-in`}>
                <button
                className="w-full bg-black py-2 text-white rounded-lg"
                onClick={closeSideCheckoutMenu}>
                  Log in to confirm order
                </button>
            </Link>
            )}

            

          </div>
      </aside>
    );
  
};

export { CheckoutSideMenu };
