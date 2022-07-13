import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Homepage() {
  const { categoriesArr } = useSelector((store) => store.categories);

  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-900">Categories</h2>
          {categoriesArr.map((category) => {
            <p>{category.title}</p>;
          })}

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {categoriesArr.map((category) =>
              category.subcategories.map((subcategory) => (
                <Link
                  to={subcategory.slug}
                  key={subcategory.title}
                  className="group relative"
                >
                  {subcategory.title}
                  <div className="relative w-full h-50 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                    <img
                      src={subcategory.imageSrc}
                      alt={subcategory.title}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-6 text-sm text-gray-500">
                    <a href={subcategory.slug}>
                      <span className="absolute inset-0" />
                      {subcategory.title}
                    </a>
                  </h3>
                  {/* <p className="text-base font-semibold text-gray-900">
                      {subcategory.description}
                    </p> */}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
