import axios from "axios";

import { GET_CATEGORIES_SUBCATEGORIES } from "./types";

export const getCategoriesSubcategories = async () => {
  let url = `/api/getCategoriesSubCategories/`;
  let response = "";
  // axios
  //   .get(api)
  //   .then((res) => {
  //     // dispatch({ type });

  //   })
  //   .catch();
  try {
    response = await axios.get(url);
  } catch (e) {
    if (e.response.status === 401) {
      console.log("err in nav");
    }
  }
  console.log("response ", response);
  return response?.data ? response?.data : null;
};
