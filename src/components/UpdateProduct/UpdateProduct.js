import React from "react";
import "./UpdateProduct.css";
import BaseLayout from "../Base Layout/BaseLayout";
import { useParams } from "react-router-dom";

function UpdateProduct() {
  const { productId } = useParams();

  return (
    <BaseLayout title="Update Product">
      <div className="updateProduct">
        <h1>{productId}</h1>
      </div>
    </BaseLayout>
  );
}

export default UpdateProduct;
