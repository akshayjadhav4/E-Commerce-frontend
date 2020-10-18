import React, { useEffect } from "react";
import "./ManageOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { selectOrders, getAllOrders } from "../../features/order/orderSlice";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";
import { Card, CardContent } from "@material-ui/core";
import CurrencyFormat from "react-currency-format";
function ManageOrders() {
  const dispatch = useDispatch();
  const { user, token } = useSelector(selectAuthentication);
  const { orders, isLoading } = useSelector(selectOrders);

  useEffect(() => {
    dispatch(getAllOrders(user._id, token));
  }, [dispatch, user._id, token]);
  return (
    <div className="manageOrders">
      {orders?.length > 0 ? (
        <div className="manageOrders__ordersList">
          {orders.map((order) => (
            <div className="manageOrders__order">
              <Card className="manageOrders__orderCard" key={order._id}>
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
                    <div className="manageOrders__orderProduct">
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
