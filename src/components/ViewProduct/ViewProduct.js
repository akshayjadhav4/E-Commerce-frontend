import React from "react";
import "./ViewProduct.css";
import BaseLayout from "../Base Layout/BaseLayout";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectProducts } from "../../features/products/productsSlice";
import {
  addToCart,
  hideMessage,
  selectCart,
} from "../../features/cart/cartSlice";
import ImageHelper from "../../helpers/ImageHelper/ImageHelper";
import PriceDisplay from "../../helpers/PriceDisplay/PriceDisplay";
import { Typography, IconButton, Card, CardContent } from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Alert, Rating } from "@material-ui/lab";

function ViewProduct() {
  const { productId } = useParams();

  const { cartMessage } = useSelector(selectCart);
  const { products } = useSelector(selectProducts);
  // filter products list and slect only one which we want to update
  const product = products?.filter((product) => product._id === productId);

  const dispatch = useDispatch();

  const addProduct = () => {
    dispatch(addToCart(product));
    setTimeout(() => {
      dispatch(hideMessage());
    }, 1000);
  };

  return (
    <BaseLayout title="Info">
      <div className="viewProduct">
        {cartMessage && <Alert severity="success">{cartMessage}</Alert>}
        <br />
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

            <IconButton onClick={addProduct} disabled={product[0]?.stock === 0}>
              <AddShoppingCartIcon
                style={{
                  color: product[0]?.stock === 0 ? "#c1c1c1" : "#45CE30",
                }}
              />
            </IconButton>
          </div>
        </div>
        <h1>Reviews</h1>
        {product[0]?.reviews.length > 0 ? (
          <div className="viewProduct__reviews">
            {product[0]?.reviews.map((review) => (
              <Card className="viewProduct__reviewCard">
                <CardContent>
                  <h3>CustomerId: {review.author}</h3>
                  <p>{review.content}</p>
                  <Rating name="reviewRating" value={review.rating} readOnly />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <h3>No Reviews</h3>
        )}
      </div>
    </BaseLayout>
  );
}

export default ViewProduct;
