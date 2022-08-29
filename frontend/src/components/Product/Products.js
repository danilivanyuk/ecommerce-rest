import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { filterProductsBySubCategory } from "../../features/productsSlice";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

export default function Products() {
  const URLparams = useParams();
  let { isLoading } = useSelector((store) => store.products);

  let subCategoriesArr = useSelector((store) =>
    store.subcategories.subCategoriesArr.filter(
      (subcategory) => subcategory.categorySlug === URLparams.category
    )
  );

  let subCategoriesSlugs = subCategoriesArr.map(
    (subcategory) => subcategory.slug
  );

  let productsArr = URLparams.subcategory
    ? useSelector((store) =>
        store.products.productsArr.filter(
          (product) => product.subcategorySlug === URLparams.subcategory
        )
      )
    : useSelector((store) =>
        store.products.productsArr.filter((product) =>
          subCategoriesSlugs.includes(product.subcategorySlug)
        )
      );

  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productsArr.map((product) => (
            <Link
              key={product.id}
              to={
                URLparams.subcategory
                  ? product.slug
                  : `${product.subcategorySlug}/${product.slug}`
              }
              state={product}
              className="group relative"
            >
              {product.title}
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={`/static/images/${product.images[0].image}`}
                  alt={product.imageAlt}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <p>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </p>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.sell_price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
}
