import React, { useEffect } from "react";
import "./ManageProducts.css";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FlipMove from "react-flip-move";
import { useSelector, useDispatch } from "react-redux";
import { selectError } from "../../features/error/errorSlice";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";
import {
  getAllProducts,
  selectProducts,
} from "../../features/products/productsSlice";
function ManageProducts() {
  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const { user, token } = useSelector(selectAuthentication);
  const { products, isLoading, productMessage } = useSelector(selectProducts);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div className="manageProducts">
      <Typography variant="h4">Manage Products</Typography>
      <hr />
      <br />
      {/* Alert to show error */}
      {error && <Alert severity="error">{error}</Alert>}
      {/* Alert to show Success */}
      {productMessage && <Alert severity="success">{productMessage}</Alert>}
      {isLoading && <LinearProgress />}
      <br />
      <Typography variant="subtitle2">
        Total Products {products?.length}
      </Typography>
      <div className="manageProducts__list">
        <FlipMove>
          {products.map((product) => (
            <Card
              key={product._id}
              variant="outlined"
              className="manageProducts__card"
            >
              <CardContent className="manageProducts__cardContent">
                <h5>{product.name}</h5>
                <div className="manageProducts__itemCount">
                  <p>Sold : {product.sold}</p>
                  <p>Stock: {product.stock}</p>
                </div>
              </CardContent>
              <CardActions className="manageProducts__cardActions">
                <IconButton onClick={() => {}}>
                  <DeleteForeverIcon className="manageProducts__deleteIcon" />
                </IconButton>
                {/* Update */}
              </CardActions>
            </Card>
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default ManageProducts;
