import React from "react";
import "./ViewProduct.css";
import BaseLayout from "../Base Layout/BaseLayout";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectProducts } from "../../features/products/productsSlice";
import ImageHelper from "../../helpers/ImageHelper/ImageHelper";
import PriceDisplay from "../../helpers/PriceDisplay/PriceDisplay";
import { Typography, IconButton } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

function ViewProduct() {
  const { productId } = useParams();

  const { products } = useSelector(selectProducts);
  // filter products list and slect only one which we want to update
  const product = products?.filter((product) => product._id === productId);

  return (
    <BaseLayout title="Info">
      <div className="viewProduct">
        <div className="viewProduct__topSection">
          <div className="viewProduct__image">
            <ImageHelper product={product[0]} />
          </div>
          <div className="viewProduct__info">
            <Typography variant="h4" color="textSecondary" component="p">
              {product[0]?.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <strong>Description: </strong> {product[0]?.description}
            </Typography>
            <PriceDisplay price={product[0]?.price} />
            <Typography variant="body2" color="textSecondary" component="p">
              {product[0]?.stock === 0 ? (
                "Out of stock"
              ) : (
                <>
                  Only <strong>{product[0]?.stock}</strong> left in stock
                </>
              )}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <strong>Category: </strong>
              {product[0]?.category.name}
            </Typography>

            <IconButton>
              <AddShoppingCartIcon style={{ color: "#45CE30" }} />
            </IconButton>
          </div>
        </div>
        <h1>Reviews</h1>
      </div>
    </BaseLayout>
  );
}

export default ViewProduct;
