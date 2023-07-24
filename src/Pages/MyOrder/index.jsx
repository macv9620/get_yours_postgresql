import { useAppContext } from "../../Context/ContextAppProvider";
import { OrderCard } from "../../Components/OrderCard";
import "./MyOrder.css";
import { Link, useParams } from "react-router-dom";
import { Back } from "../../Components/Icons/Back";
import { OrderList } from "../../Components/OrdersList";
import { CircleRight } from "../../Components/Icons/CircleRight";
import { Layout } from "../../Components/Layout";

function MyOrder() {
  const { orders } = useAppContext();


  const { id } = useParams();


  const indexToShow = orders.findIndex(
    (order) => Number(order.id) === Number(id)
  );

  const orderToShow = orders[indexToShow];

  console.log(orderToShow)

  const totalPrice = orderToShow.order_product.reduce((acc, product)=> {
    acc+=product.product_q*product.product.price
    return acc
  }, 0)

  return (
    <Layout>
    <div className="order-preview-container">
      <div className="flex flex-col">
        <div>
          <p className="font-bold">Summary:</p>
        </div>
        <div className="w-80">
        {orderToShow && (
          <OrderList
            date={orderToShow.date.substr(0, 10)}
            time={orderToShow.date.substr(11, 5)}
            totalProducts={orderToShow.order_product.length}
            totalPrice={totalPrice}
            orderId={orderToShow.id}
            from={"my-account"}
          />
        )}
        </div>
        <div className="flex items-center justify-center gap-6 my-0">
          <p className="font-bold">Detail</p>
          <CircleRight />
        </div>
      </div>

      <div className="my-order-container flex flex-col items-center text-3xl font-bold">
        <div className="flex items-center">
          <Link to={"../"}>
            <span className="cursor-pointer">
              <Back />
            </span>
          </Link>
          <h2 className="px-4">Order id: #{id}</h2>
        </div>
        <div className="scroll-format overflow-y-scroll p-4 h-80 my-6">
          {orderToShow?.order_product.map((item, index) => {
            return <OrderCard key={index} product={item} from={"MyOrder"} />;
          })}
        </div>

        <div className="w-full px-6">
          <p className="flex justify-between items-center mb-2">
            <span className="font-light">Total: </span>
            <span className="font-medium text-2xl">
              ${orderToShow?.totalPrice}
            </span>
          </p>
        </div>
      </div>
    </div>
    </Layout>
  );
}

export { MyOrder };
