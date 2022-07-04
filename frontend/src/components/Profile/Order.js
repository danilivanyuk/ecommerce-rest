import React from "react";
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
export default function Order() {
  return (
    <div className="">
      <div className="pb-4 border-b">
        <div className="sm:flex justify-between border-b pb-4 mb-6">
          <div className="flex items-center">
            <p className="text-gray-900 text-md sm:text-xl mr-3 sm:mr-4">
              Order #1231
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              Delivered on January 22, 2021
            </p>
          </div>
          <div className="flex items-center mt-2 sm:mt-0">
            {/* <button className="inline-flex justify-center w-full py-2 mr-4 sm:mr-2 sm:mr-4 px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Reserved
            </button>
            <button className="inline-flex justify-center w-full py-2  px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Reserved
            </button> */}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <div className="aspect-w-4 rounded aspect-h-2 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={product.image[0].src}
                alt={product.image[0].alt}
                className="w-32 rounded h-40 object-center object-cover"
              />
            </div>

            <div className="flex flex-col h-full justify-self-start ml-3 max-w-xl">
              <p className="text-md font-semibold tracking-tight text-gray-900 sm:text-md">
                {product.name}
              </p>
              <p className="mt-1/2 text-md tracking-tight text-gray-500 sm:text-md">
                {product.color} | {product.size[0].name}
              </p>
              <p className="mt-1/2 text-md font-medium tracking-tight text-gray-900 sm:text-md">
                {product.price}
              </p>
            </div>
          </div>
          <div>
            <button className="inline-flex justify-center mb-4 w-full py-2  px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Reserved
            </button>
            <button className="inline-flex justify-center w-full py-2  px-4 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Reserved
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
