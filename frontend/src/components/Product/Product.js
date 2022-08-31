import React, { useEffect } from "react";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
// const product = {
//   name: "Basic Tee 6-Pack",
//   price: "$192",
//   href: "#",
//   breadcrumbs: [
//     { id: 1, name: "Men", href: "#" },
//     { id: 2, name: "Clothing", href: "#" },
//   ],
//   images: [
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
//       alt: "Two each of gray, white, and black shirts laying flat.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
//       alt: "Model wearing plain black basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
//       alt: "Model wearing plain gray basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
//       alt: "Model wearing plain white basic tee.",
//     },
//   ],
//   colors: [
//     { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//   ],
//   sizes: [
//     { name: "XXS", inStock: false },
//     { name: "XS", inStock: true },
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//     { name: "XL", inStock: true },
//     { name: "2XL", inStock: true },
//     { name: "3XL", inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     "Hand cut and sewn locally",
//     "Dyed with our proprietary colors",
//     "Pre-washed & pre-shrunk",
//     "Ultra-soft 100% cotton",
//   ],
//   details:
//     'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// };
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function Product() {
  const URLparams = useParams();
  let currentImage;
  const { isLoading, isProductsSuccess } = useSelector(
    (store) => store.products
  );
  const selectedProduct = useSelector((store) =>
    store.products.productsArr.find(
      (product) => product.slug === URLparams.productSlug
    )
  );
  const selectedSubcategory = useSelector((store) =>
    store.subcategories.subCategoriesArr.find(
      (subcategory) => subcategory.slug === URLparams["subcategory"]
    )
  );

  const selectedCategory = useSelector((store) =>
    store.categories.categoriesArr.find(
      (category) => category.slug === URLparams["category"]
    )
  );

  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  useEffect(() => {
    if (isProductsSuccess) {
      setSelectedColor(
        selectedProduct.colors.length > 1
          ? selectedProduct.colors[0]
          : selectedProduct.colors
      );
      setSelectedSize(selectedProduct.sizes[0]);
    }
  }, [selectedProduct]);
  // console.log(selectedProduct, selectedColor, selectedSize);

  currentImage = isProductsSuccess
    ? selectedProduct.images.find((image) =>
        image.image.includes(selectedColor.toLowerCase())
      )
    : [];

  console.log("selected: " + isLoading, isProductsSuccess);
  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else
    return (
      <div className="bg-gray-100">
        {/* <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-1 lg:gap-x-8"></div> */}
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <a
                    href={`catalog/${URLparams["category"]}`}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {selectedCategory.title}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                  <a
                    href={`catalog/${URLparams["category"]}/${URLparams["subcategory"]}`}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {selectedSubcategory.title}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>

              <li className="text-sm">
                <a
                  href={selectedProduct.slug}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {selectedProduct.title}
                </a>
              </li>
            </ol>
          </nav>
        </div>
        <div className="max-w-2xl mx-auto pt-2 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-6 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <div className="aspect-w-4 aspect-h-5 sm:rounded-lg sm:overflow-hidden lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={`/static/images/${currentImage.image}`}
                alt={currentImage.imageAlt}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {selectedProduct.title}
            </h1>
            <p className="mt-1 text-3xl text-gray-900">
              {selectedProduct.sell_price}
            </p>

            {/* Reviews */}
            <div className="space-y-6 mt-6">
              <p className="text-sm text-gray-500">
                {selectedProduct.description}
              </p>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm text-gray-900 font-medium">Colors</h3>

                <RadioGroup
                  value={selectedColor}
                  onChange={setSelectedColor}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a color
                  </RadioGroup.Label>
                  <div className="flex items-center space-x-3">
                    {typeof selectedProduct.colors === "object" ? (
                      selectedProduct.colors.map((color) => (
                        <RadioGroup.Option
                          key={color}
                          value={color}
                          style={{ backgroundColor: selectedProduct.color }}
                          className={({ active, checked }) =>
                            classNames(
                              color.selectedClass,
                              active && checked ? "ring ring-offset-1" : "",
                              !active && checked ? "ring-2" : "",
                              "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                            )
                          }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color}
                          </RadioGroup.Label>
                          <span
                            aria-hidden="true"
                            style={{
                              backgroundColor: color,
                            }}
                            className={classNames(
                              "h-8 w-8 border border-black border-opacity-10 rounded-full"
                            )}
                          />
                        </RadioGroup.Option>
                      ))
                    ) : (
                      <RadioGroup.Option
                        key={selectedProduct.colors}
                        value={selectedProduct.colors}
                        style={{ backgroundColor: selectedProduct.color }}
                        className={({ active, checked }) =>
                          classNames(
                            selectedProduct.colors.selectedClass,
                            active && checked ? "ring ring-offset-1" : "",
                            !active && checked ? "ring-2" : "",
                            "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                          )
                        }
                      >
                        <RadioGroup.Label as="span" className="sr-only">
                          {selectedProduct.colors}
                        </RadioGroup.Label>
                        <span
                          aria-hidden="true"
                          style={{
                            backgroundColor: selectedProduct.colors,
                          }}
                          className={classNames(
                            "h-8 w-8 border border-black border-opacity-10 rounded-full"
                          )}
                        />
                      </RadioGroup.Option>
                    )}
                  </div>
                </RadioGroup>
              </div>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm text-gray-900 font-medium">Size</h3>
                  {/* <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Size guide
                </a> */}
                </div>

                <RadioGroup
                  value={selectedSize}
                  onChange={setSelectedSize}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {typeof selectedProduct.sizes === "object" ? (
                      selectedProduct.sizes.map((size) => (
                        <RadioGroup.Option
                          key={size}
                          value={size}
                          // disabled={!size.inStock}
                          className={({ active }) =>
                            classNames(
                              // size.inStock
                              //   ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                              //   : "bg-gray-50 text-gray-200 cursor-not-allowed",
                              active ? "ring-2 ring-indigo-500" : "",
                              "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {size}
                              </RadioGroup.Label>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))
                    ) : (
                      <RadioGroup.Option
                        key={selectedProduct.sizes}
                        value={selectedProduct.sizes}
                        // disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            // size.inStock
                            //   ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                            //   : "bg-gray-50 text-gray-200 cursor-not-allowed",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {selectedProduct.sizes}
                            </RadioGroup.Label>
                          </>
                        )}
                      </RadioGroup.Option>
                    )}
                  </div>
                </RadioGroup>
              </div>

              <button
                type="submit"
                className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to bag
              </button>
            </form>
            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="pl-4 list-disc text-sm space-y-2">
                  {/* {product.highlights.map((highlight) => (
                  <li key={highlight} className="text-gray-400">
                    <span className="text-gray-600">{highlight}</span>
                  </li>
                ))} */}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  {selectedProduct.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
