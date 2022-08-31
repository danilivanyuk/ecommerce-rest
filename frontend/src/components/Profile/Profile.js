import React, { useEffect } from "react";
import Order from "./Order";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrders } from "../../features/profileSlice";

export default function Profile() {
  const { customerInfo } = useSelector((store) => store.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerOrders());
  }, []);

  return (
    <div className="bg-gray-100 ">
      <div className="max-w-7xl md:w-2/3 xl:w-1/2 pt-6 mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Personal Info
        </h1>
        <div className="flex pt-6 items-center ">
          <div className="overflow-hidden mr-4">
            <img
              className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
              src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div>
            <p className="text-gray-800 font-semibold text-xl">
              {customerInfo.name}
            </p>
            <p className="text-gray-800 font-semibold text-m">
              {customerInfo.phone}
            </p>
            <p className="text-gray-800 font-semibold text-m">
              Adress: {customerInfo.city}, {customerInfo.street},{" "}
              {customerInfo.house}, {customerInfo.appartament}
            </p>
          </div>
        </div>
        <h1 className="text-2xl mt-12 mb-6 font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Your Orders
        </h1>
        <div className=" mx-auto">
          <Order />
        </div>
      </div>
    </div>
  );
}
