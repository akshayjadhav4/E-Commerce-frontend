import React, { useEffect } from "react";
import "./UserDashboard.css";
import BaseLayout from "../Base Layout/BaseLayout";
import { useSelector, useDispatch } from "react-redux";
import {
  selectOrders,
  getCustomerOrders,
} from "../../features/order/orderSlice";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";
import { Card, CardContent, CardActions } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
import AddReview from "../AddReview/AddReview";

function UserDashboard() {
  const dispatch = useDispatch();
  const { user, token } = useSelector(selectAuthentication);
  const { orders, isLoading } = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getCustomerOrders(user._id, token));
  }, [dispatch, user._id, token]);
  return (
    <BaseLayout title="User Dashboard">
      <div className="userDashboard">
        {orders?.length > 0 ? (
          <div className="userDashboard__ordersList">
            {orders.map((order) => (
              <div className="userDashboard__order">
                <Card className="userDashboard__orderCard" key={order._id}>
                  <CardContent className="userDashboard__orderOne">
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
                  <CardContent className="userDashboard__orderTwo">
                    <h3>Products Purchased</h3>
                    {order.products.map((product) => (
                      <>
                        <div className="userDashboard__orderProduct">
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
                        {order.status === "Delivered" && (
                          <CardActions>
                            <AddReview productId={product._id} />
                          </CardActions>
                        )}
                      </>
                    ))}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="userDashboard__notfound">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <h1>No previous shopping records.</h1>
            )}
          </div>
        )}
      </div>
    </BaseLayout>
  );
}

export default UserDashboard;
