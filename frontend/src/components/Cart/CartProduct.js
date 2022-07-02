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
export default function CartProduct() {
  return (
    <div>
      <div className="flex flex-col justify-between md:flex-row">
        <div className="flex">
          <div className="aspect-w-4 aspect-h-2 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={product.image[0].src}
              alt={product.image[0].alt}
              className="w-32 h-40 object-center object-cover"
            />
          </div>

          <div className="flex flex-col h-full justify-self-start ml-3 max-w-xl">
            <p className="text-md font-semibold tracking-tight text-gray-900 sm:text-md">
              {product.name}
            </p>
            <p className="mt-1/2 text-md tracking-tight text-gray-500 sm:text-md">
              {product.color} | {product.size.name} S
            </p>
            <p className="mt-1/2 text-md font-medium tracking-tight text-gray-900 sm:text-md">
              {product.price}
            </p>
          </div>
        </div>
        {/* Info */}
        {/* Quantity */}
        <div className="flex border-t w-full items-center justify-around mt-2 md:justify-between md:mt-0 md:border-0 md:w-1/2 md:items-start md:pl-6">
          <div className="flex md:mt-0">
            <p>-</p>
            <p>1</p>
            <p>+</p>
          </div>
          {/* Delete */}
          <div className="flex max-w-xl">
            <p>X</p>
          </div>
        </div>
      </div>
      <div className="flex mt-4 flex-col justify-between md:flex-row">
        <div className="flex">
          <div className="aspect-w-4 aspect-h-2 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={product.image[0].src}
              alt={product.image[0].alt}
              className="w-32 h-40 object-center object-cover"
            />
          </div>

          <div className="flex flex-col h-full justify-self-start ml-3 max-w-xl">
            <p className="text-md font-semibold tracking-tight text-gray-900 sm:text-md">
              {product.name}
            </p>
            <p className="mt-1/2 text-md tracking-tight text-gray-500 sm:text-md">
              {product.color} | {product.size.name} S
            </p>
            <p className="mt-1/2 text-md font-medium tracking-tight text-gray-900 sm:text-md">
              {product.price}
            </p>
          </div>
        </div>
        {/* Info */}
        {/* Quantity */}
        <div className="flex border-t w-full items-center pt-2 justify-around mt-2 md:justify-between md:mt-0 md:border-0 md:w-1/2 md:items-start md:pl-6 md:pt-0">
          <div className="flex md:mt-0">
            <p>-</p>
            <p>1</p>
            <p>+</p>
          </div>
          {/* Delete */}
          <div className="flex max-w-xl">
            <p>X</p>
          </div>
        </div>
      </div>
    </div>
  );
}
