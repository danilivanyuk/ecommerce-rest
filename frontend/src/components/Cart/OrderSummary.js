import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OrderSummary() {
  const { isLoading, shippingCost } = useSelector((store) => store.cart);
  let cartTotalArr = useSelector((store) =>
    store.cart.cartArr.map(
      (cartItem, sum) =>
        (sum = sum + cartItem.product[0].sell_price * cartItem.quantity)
    )
  );
  let cartTotal = cartTotalArr.reduce((curr, prev) => curr + prev, 0);
  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else
    return (
      <div className="px-4 sm:pt-6 sm:px-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-3">
            <h1 className="text-xl font-bold">Order Summary</h1>

            <div className="mt-1 flex rounded-md shadow-sm"></div>
            <div>
              <div className="flex w-full justify-between py-4 border-b">
                <p className="text-gray-500">Subtotal</p>
                <p className="text-base font-semibold text-gray-700">
                  {cartTotal}$
                </p>
              </div>
              <div className="flex w-full justify-between py-4 border-b">
                <p className="text-gray-500">Shipping estimate</p>
                <p className="text-base font-semibold text-gray-700">
                  {shippingCost}$
                </p>
              </div>
            </div>
            <div className="flex w-full justify-between py-4 ">
              <p className="text-lg font-semibold text-gray-900">Order Total</p>
              <p className="text-lg font-semibold text-gray-900">
                {cartTotal + shippingCost}$
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
