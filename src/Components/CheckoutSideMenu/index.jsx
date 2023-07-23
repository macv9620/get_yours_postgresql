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

const CheckoutSideMenu = () => {

  const { closeSideCheckoutMenu, showCheckoutSide, cartItems, setCartItems, openSideCheckoutMenu } =
    useAppContext();

  const {token, user} = useAuthContext()

  
  const orderToAdd = ()=> {
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
          return {
            orderId: res.data.data.id,
            productId: product.id,
            productQ: product.productQuantity
          }
        })
        console.log(productsToPost)
        postOrderProducts(productsToPost, token)
      }
    })
    .catch(err => console.log(err))

    //setOrders([...orders, orderSummaryInfo])
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
                product={item}
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
