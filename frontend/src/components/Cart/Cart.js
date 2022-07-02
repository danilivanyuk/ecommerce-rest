import React, { useState } from "react";
import CartProduct from "./CartProduct";
import Checkout from "./Checkout";
import OrderSummary from "./OrderSummary";

export default function Cart() {
  const [checkout, setCheckout] = useState(true);
  return (
    <div>
      <h1 className="max-w-2xl mx-auto mt-6  px-4 sm:px-6 lg:max-w-7xl  text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
        Cart
      </h1>
      <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <CartProduct />
        </div>
        <div className="mt-4 lg:mt-0 lg:row-span-3">
          <div className="md:mt-0 md:col-span-2 bg-gray-50">
            {!checkout ? (
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <OrderSummary />
                <div className="px-4 pb-4 bg-gray-50 sm:px-6">
                  <button
                    onClick={() => {
                      setCheckout(true);
                    }}
                    type="submit"
                    className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <Checkout />
                <div className="px-4 pb-4 bg-gray-50 sm:px-6">
                  <button
                    onClick={() => {
                      setCheckout(false);
                    }}
                    type="submit"
                    className="inline-flex justify-center w-full py-2 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
