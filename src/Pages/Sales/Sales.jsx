import { useEffect, useState } from "react";
import { Layout } from "../../Components/Layout";
import "./Sales.css";
import { getAllOrders } from "../../services/getAllOrders";
import { useAuthContext } from "../../Context/ContextAuthProvider";

function Sales() {
  const [allOrders, setAllOrders] = useState(null);
  const { token } = useAuthContext();

  useEffect(() => {
    getAllOrders(token)
      .then((res) => {
        console.log(res);
        setAllOrders(res.data.data.ordersInfo);
      })
      .catch((err) => {
          console.log(err);
        });
    }, []);
    
    let totalOrder = 0
  return (
    <Layout>
      <div className="text-3xl font-bold my-4">Sales Report</div>
      <div>
        <table className="tg my-4">
          <thead>
            <tr>
              <th className="tg-baqh">Order ID</th>
              <th className="tg-baqh">User ID</th>
              <th className="tg-baqh">Name</th>
              <th className="tg-baqh">Date</th>
              <th className="tg-baqh">Products</th>
              <th className="tg-baqh">Price</th>
              <th className="tg-baqh">Quantity</th>
              <th className="tg-baqh">Total</th>
              <th className="tg-baqh">Order Total</th>
            </tr>
          </thead>
          <tbody>
            {allOrders?.map((user) => {
                return(
              <>
                {user.order_order_userTouser?.map((order) => {
                  return (
                    <>
                      <tr>
                        <td className="tg-amwm" rowSpan={order.order_product.length}>
                         #{order.id}
                        </td>
                        <td className="tg-amwm" rowSpan={order.order_product.length}>
                        {user.id}
                        </td>
                        <td className="tg-amwm" rowSpan={order.order_product.length}>
                          {`${user.first_name} ${user.last_name}`}
                        </td>
                        <td className="tg-amwm" rowSpan={order.order_product.length}>
                          {`${order.date.substr(0, 10)} / ${order.date.substr(11, 5)}`}
                        </td>
                        <td className="tg-baqh">{order.order_product[0].product.name}</td>
                        <td className="tg-baqh">${order.order_product[0].product.price}</td>
                        <td className="tg-baqh">{order.order_product[0].product_q}</td>
                        <td className="tg-baqh">${order.order_product[0].product.price*order.order_product[0].product_q}</td>
                        <td className="tg-baqh font-bold" rowSpan={order.order_product.length}>
                          {totalOrder}
                        </td>
                      </tr>
                      {order?.order_product.map((product, index)=>{
                        totalOrder = totalOrder + 1
                        if(index === 0){
                            return null
                        }
                      return(<tr key={index}>
                        <td className="tg-baqh">{product.product.name}</td>
                        <td className="tg-baqh">${product.product.price}</td>
                        <td className="tg-baqh">{product.product_q}</td>
                        <td className="tg-baqh">${product.product.price*product.product_q}</td>
                      </tr>
                      )
                      })}


                    </>
                  );
                })}
              </>)
            })}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export { Sales };
