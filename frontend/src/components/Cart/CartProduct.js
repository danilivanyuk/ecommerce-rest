import React from "react";

import { MinusSmIcon, PlusSmIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
// import { removeProduct } from "../../features/cartSlice.js";
import {
  removeProduct,
  removeQuantity,
  addQuantity,
} from "../../features/cartSlice.js";
export default function CartProduct(parentData) {
  const { cartItem } = parentData;
  const dispatch = useDispatch();
  const product = cartItem.product[0];
  const { isLoading } = useSelector((store) => store.products);
  // const product = useSelector((store) =>
  //   store.products.productsArr.find(

  //     (product) => product.id === cartItem.product
  //   )
  // );
  console.log(cartItem);
  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else
    return (
      <div className="mt-3">
        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex">
            <div className="aspect-w-4 rounded aspect-h-2 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={`/static/images/${product.productimage__image}`}
                alt={product.productimage__imageAlt}
                className="w-32 rounded h-40 object-center object-cover"
              />
            </div>

            <div className="flex flex-col h-full justify-self-start ml-3 max-w-xl">
              <p className="text-md font-semibold tracking-tight text-gray-900 sm:text-md">
                {product.title}
              </p>
              <p className="mt-1/2 text-md tracking-tight text-gray-500 sm:text-md">
                {cartItem.size} | {cartItem.color_title}
              </p>
              <p className="mt-1/2 text-md font-medium tracking-tight text-gray-900 sm:text-md">
                {product.sell_price}$
              </p>
            </div>
          </div>
          {/* Info */}
          {/* Quantity */}
          <div className="flex border-t w-full items-center justify-around mt-2 md:justify-between md:mt-0 md:border-0 md:w-1/2 md:items-start md:pl-6">
            <div className="flex md:mt-0 items-center">
              <button
                disabled={cartItem.quantity < 2}
                type="button"
                className="mt-1 mr-1 w-10 h-10 bg-white p-1 rounded-md flex items-center justify-center text-gray-400"
                onClick={() => dispatch(removeQuantity(cartItem.id))}
              >
                <MinusSmIcon className="h-5 w-5" />
              </button>
              <p className="text-semibold">{cartItem.quantity}</p>
              <button
                type="button"
                className="-mr-2 mt-1  ml-1 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                onClick={() => dispatch(addQuantity(cartItem.id))}
              >
                <PlusSmIcon className="h-5 w-5" />
              </button>
            </div>
            {/* Delete */}
            <div className="flex max-w-xl">
              <button
                type="button"
                className="mt-1 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                onClick={() => dispatch(removeProduct([cartItem.id]))}
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
