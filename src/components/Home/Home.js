import React, { useEffect } from "react";
import BaseLayout from "../Base Layout/BaseLayout";
import ProductCard from "../ProductCard/ProductCard";
import { Grid, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { selectError, clearError } from "../../features/error/errorSlice";
import { selectProducts } from "../../features/products/productsSlice";
import { selectCart, hideMessage } from "../../features/cart/cartSlice";
function Home() {
  const error = useSelector(selectError);
  const { products, isLoading } = useSelector(selectProducts);
  const { cartMessage } = useSelector(selectCart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
    dispatch(hideMessage());
  }, [dispatch]);

  return (
    <BaseLayout title="Welcome To My Store">
      <div className="home">
        {/* Alert to show error */}
        {error && <Alert severity="error">{error}</Alert>}
        {/* Cart updated message */}
        {cartMessage && <Alert severity="success">{cartMessage}</Alert>}
        {isLoading && <LinearProgress color="secondary" />}
        <br />
        <Grid container spacing={3}>
          {products &&
            products?.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCard product={product} showAddToCart />
              </Grid>
            ))}
        </Grid>
      </div>
    </BaseLayout>
  );
}

export default Home;
