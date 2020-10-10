import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Button,
} from "@material-ui/core";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ImageHelper from "../../helpers/ImageHelper/ImageHelper";
import PriceDisplay from "../../helpers/PriceDisplay/PriceDisplay";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart, hideMessage } from "../../features/cart/cartSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
}));

function ProductCard({ product, showAddToCart }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const addProduct = () => {
    dispatch(addToCart(product));
    setTimeout(() => {
      dispatch(hideMessage());
    }, 4000);
  };
  return (
    <div className="productCard">
      <Card className={classes.root}>
        <ImageHelper product={product} />
        <CardContent>
          <Typography variant="h5" color="textSecondary" component="p">
            {product.name}
          </Typography>
          <PriceDisplay price={product.price} />
          <Typography variant="body2" color="textSecondary" component="p">
            {product.stock === 0 ? (
              "Out of stock"
            ) : (
              <>
                Only <strong>{product.stock}</strong> left in stock
              </>
            )}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {showAddToCart ? (
            <IconButton onClick={addProduct}>
              <AddShoppingCartIcon style={{ color: "#45CE30" }} />
            </IconButton>
          ) : (
            <IconButton>
              <RemoveShoppingCartIcon style={{ color: "#FF3031" }} />
            </IconButton>
          )}
          <Button variant="outlined">
            <Link
              to={`/viewproduct/${product._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Know More
            </Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default ProductCard;
