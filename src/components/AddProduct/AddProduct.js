import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  selectCategories,
} from "../../features/category/categorySlice";
import { Typography } from "@material-ui/core";

function AddProduct() {
  const dispatch = useDispatch();
  const { categories } = useSelector(selectCategories);

  //   getting categories for showing in dropdown menu
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  console.log(categories);
  return (
    <div className="addProduct">
      <Typography variant="h4">Add Product</Typography>
      <hr />
      <br />
    </div>
  );
}

export default AddProduct;
