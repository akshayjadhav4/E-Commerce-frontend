import React from "react";
import BaseLayout from "../Base Layout/BaseLayout";
import ProductCard from "../ProductCard/ProductCard";
import { Grid, LinearProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { selectError } from "../../features/error/errorSlice";
import { selectProducts } from "../../features/products/productsSlice";
function Home() {
  const error = useSelector(selectError);
  const { products, isLoading } = useSelector(selectProducts);

  return (
    <BaseLayout title="Welcome To My Store">
      {/* Alert to show error */}
      {error && <Alert severity="error">{error}</Alert>}
      {isLoading && <LinearProgress color="secondary" />}
      <div className="home">
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
