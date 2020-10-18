import React, { useState, useEffect } from "react";
import "./ManageOrders.css";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrders,
  getAllOrders,
  updateOrderStatus,
} from "../../features/order/orderSlice";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";
import {
  Card,
  CardContent,
  CardActions,
  FormControl,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
function ManageOrders() {
  const dispatch = useDispatch();
  const { user, token } = useSelector(selectAuthentication);
  const { orders, isLoading } = useSelector(selectOrders);

  const [status, setStatus] = useState("");

  const updateStatus = (orderId) => {
    dispatch(updateOrderStatus(orderId, status, user._id, token));
  };

  useEffect(() => {
    dispatch(getAllOrders(user._id, token));
  }, [dispatch, user._id, token]);
  return (
    <div className="manageOrders">
      {orders?.length > 0 ? (
        <div className="manageOrders__ordersList">
          {orders.map((order) => (
            <div className="manageOrders__order" key={order._id}>
              <Card className="manageOrders__orderCard">
                <CardContent className="manageOrders__orderOne">
                  <h3>Order Info</h3>
                  <p>OrderID: {order._id}</p>
                  <p>TransactionID: {order.transaction_id}</p>
                  <p>
                    Total Bill :{" "}
                    <CurrencyFormat
                      renderText={(value) => <>{value}</>}
                      decimalScale={2}
                      value={order.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₹"}
                    />
                  </p>
                  <p>Address: {order.address}</p>
                  <p>Status : {order.status}</p>
                  <p>
                    Date of Order Placed :{" "}
                    {new Date(order.createdAt).toUTCString()}
                  </p>
                </CardContent>
                <CardContent className="manageOrders__orderTwo">
                  <h3>Products Purchased</h3>
                  {order.products.map((product) => (
                    <div
                      className="manageOrders__orderProduct"
                      key={product._id}
                    >
                      <p>{product.name}</p>
                      <CurrencyFormat
                        renderText={(value) => (
                          <>
                            <strong> {value}</strong>
                          </>
                        )}
                        decimalScale={2}
                        value={product.price}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"₹"}
                      />
                    </div>
                  ))}
                </CardContent>
                <CardActions>
                  <span>Update Order Status</span>
                  <FormControl>
                    <Select
                      variant="outlined"
                      name="status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Delivered">Delivered</MenuItem>
                    </Select>
                  </FormControl>
                  {!!status && (
                    <Button
                      onClick={() => updateStatus(order._id)}
                      variant="contained"
                    >
                      Update
                    </Button>
                  )}
                </CardActions>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <div className="manageOrders__notfound">
          {isLoading ? <h1>Loading...</h1> : <h1>No records found.</h1>}
        </div>
      )}
    </div>
  );
}

export default ManageOrders;
