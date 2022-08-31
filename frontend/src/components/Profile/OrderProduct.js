import React from "react";
import { useSelector } from "react-redux";
const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  image: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  color: "White",
  size: [{ name: "S", inStock: true }],
};
export default function OrderProduct(parentData) {
  const { orderProduct } = parentData;
  const orderProductId = orderProduct.product;

  const productsArr = useSelector((store) =>
    store.products.productsArr.filter(
      (product) => product.id === orderProduct.product
    )
  );

  return (
    <>
      {productsArr.map((product) => (
        <div className="flex justify-between mt-3" key={product.id}>
          <div className="flex">
            <div className="aspect-w-4 rounded aspect-h-2 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={`/static/images/${product.images[0].image}`}
                alt={product.images[0].imageAlt}
                className="w-32 rounded h-40 object-center object-cover"
              />
            </div>

            <div className="flex flex-col h-full justify-self-start ml-3 max-w-xl">
              <p className="text-md font-semibold tracking-tight text-gray-900 sm:text-md">
                {product.title}
              </p>
              <p className="mt-1/2 text-md tracking-tight text-gray-500 sm:text-md">
                {product.colors} | {orderProduct.size}
              </p>
              {/* <p className="mt-1/2 text-md font-medium tracking-tight text-gray-900 sm:text-md">
                {product.sell_price}
              </p> */}
            </div>
          </div>
          <div className="flex justify-between w-1/4">
            <p className="mt-1/2 text-md font-medium tracking-tight text-gray-900 sm:text-md">
              {orderProduct.quantity}x
            </p>
            <p className="mt-1/2 text-md font-medium tracking-tight text-gray-900 sm:text-md">
              {orderProduct.quantity * product.sell_price}$
            </p>
            {/* <button className="inline-flex justify-center mb-4 w-full py-2  px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Reserved
            </button> */}
          </div>
        </div>
      ))}
    </>
  );
}
