import React from "react";
import { useSelector } from "react-redux";
import OrderProduct from "./OrderProduct";

export default function Order() {
  const { customerOrders } = useSelector((store) => store.profile);
  return (
    <div className="">
      <p className="text-gray-600 mb-2">
        Total amount of orders:{" "}
        <span className="text-gray-800">{customerOrders.length}</span>
      </p>
      {customerOrders.map((order) => (
        <div className="pb-4 border-b" key={order.transaction_id}>
          <div className="sm:flex justify-between border-b pb-4 mb-6">
            <div className="flex items-center justify-between w-full">
              <p className="text-gray-900 text-md sm:text-xl mr-3 sm:mr-4 w-1/3 text-left">
                Order #{order.transaction_id}
              </p>
              <p className="text-gray-600 text-sm sm:text-base w-1/3">
                Ordered: {order.ordered_date}
              </p>
              <p className="text-gray-600 text-sm sm:text-base w-1/3 text-right">
                Delivered: {order.delivered_date}
              </p>
            </div>
            <div className="flex items-center mt-2 sm:mt-0">
              {/* <button className="inline-flex justify-center w-full py-2 mr-4 sm:mr-2 sm:mr-4 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Reserved
              </button> */}
            </div>
          </div>
          <div className="ORDERPRODUCTS">
            {order.orderProducts.map((orderProduct) => (
              <div key={orderProduct.product}>
                <OrderProduct orderProduct={orderProduct} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
