import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Homepage() {
  const { categoriesArr } = useSelector((store) => store.categories);
  const { subCategoriesArr, isLoading } = useSelector(
    (store) => store.subcategories
  );

  if (isLoading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else
    return (
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Categories
            </h2>
            {/* {categoriesArr.map((category) => {
            <p>{category.title}</p>;
            <img className="menu-logo" src={category.imageURL[0]} alt="img" />;
          })} */}
            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
              {categoriesArr.map((category) =>
                subCategoriesArr
                  .filter((subcategory) => subcategory.category === category.id)
                  .map((subcategory) => (
                    <Link
                      to={category.slug + "/" + subcategory.slug}
                      state={{
                        subcategoryId: subcategory.id,
                        categoryId: subcategory.category,
                      }}
                      key={subcategory.title}
                      className="group relative"
                    >
                      {subcategory.title}
                      <div className="relative w-full h-50 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        <img
                          // For deployment
                          // src={subcategory.imageURL}

                          src={"/static" + subcategory.imageURL}
                          alt={subcategory.title}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <h3 className="mt-6 text-sm text-gray-500">
                        {/* <a href={subcategory.slug}>
                        <span className="absolute inset-0" />
                        {subcategory.title}
                      </a> */}
                      </h3>
                    </Link>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
}
