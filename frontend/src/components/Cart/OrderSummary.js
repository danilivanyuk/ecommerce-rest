import React from "react";

export default function OrderSummary() {
  return (
    <div className="px-4 sm:pt-6 sm:px-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3 sm:col-span-3">
          <h1 className="text-xl font-bold">Order Summary</h1>

          <div className="mt-1 flex rounded-md shadow-sm"></div>
          <div>
            <div className="flex w-full justify-between py-4 border-b">
              <p className="text-gray-500">Subtotal</p>
              <p className="text-base font-semibold text-gray-700">99.00$</p>
            </div>
            <div className="flex w-full justify-between py-4 border-b">
              <p className="text-gray-500">Shipping estimate</p>
              <p className="text-base font-semibold text-gray-700">5.00$</p>
            </div>
          </div>
          <div className="flex w-full justify-between py-4 ">
            <p className="text-lg font-semibold text-gray-900">Order Total</p>
            <p className="text-lg font-semibold text-gray-900">114.00$</p>
          </div>
        </div>
      </div>
    </div>
  );
}
