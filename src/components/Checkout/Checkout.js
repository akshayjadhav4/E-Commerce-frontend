import React, { useState, useEffect } from "react";
import "./Checkout.css";
import BaseLayout from "../Base Layout/BaseLayout";
import PriceDisplay from "../../helpers/PriceDisplay/PriceDisplay";
import SubTotal from "../../helpers/SubTotal/SubTotal";
import FlipMove from "react-flip-move";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Button,
  LinearProgress,
} from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import DropIn from "braintree-web-drop-in-react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";
import {
  selectCart,
  removeItemFromCart,
  hideMessage,
  cartEmpty,
} from "../../features/cart/cartSlice";
import {
  getmeToken,
  processPayment,
} from "../../helpers/paymentGateway/paymentGateway";
import { useHistory } from "react-router-dom";
import { getBasketTotal } from "../../features/cart/cartSlice";
import { createOrder } from "../../features/order/orderSlice";
import { CssTextField } from "../CssTextField/CssTextField";

function Checkout() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCart);
  const { user, token } = useSelector(selectAuthentication);

  const [clientToken, setClientToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState("");
  const getToken = (userId, token) => {
    getmeToken(userId, token)
      .then((info) => {
        if (info.error) {
          alert(info.error);
        } else {
          setClientToken(info);
        }
      })
      .catch((error) => alert("ERROR WHILE GETTING TOKEN"));
  };

  const onPurchase = () => {
    setIsLoading(true);
    const amount = getBasketTotal(cart);
    let nonce;
    clientToken.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: amount,
        };
        processPayment(user._id, token, paymentData)
          .then((response) => {
            if (response.errors) {
              alert(response.message);
              setIsLoading(false);
            } else {
              const orderData = {
                products: cart,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount,
                address: address,
              };
              dispatch(createOrder(user._id, token, orderData));
              // cart empty
              dispatch(cartEmpty);
              setIsLoading(false);
              // redirect user to dashboard
              history.push("/user/dashboard");
            }
          })
          .catch((error) => {
            setIsLoading(false);
            alert("ERROR WHILE PURCHASEING");
          });
      })
      .catch((error) => {
        setIsLoading(false);
        alert("ERROR WHILE REQUESTING PAYMENT METHOD");
      });
  };

  useEffect(() => {
    getToken(user._id, token);
  }, [user._id, token]);

  const removeProduct = (id) => {
    dispatch(removeItemFromCart(id));
    setTimeout(() => {
      dispatch(hideMessage());
    }, 1000);
  };
  return (
    <BaseLayout title="Checkout">
      {isLoading && <LinearProgress />}
      <Card style={{ backgroundColor: "#fafafa" }}>
        <CardContent>
          <div className="checkout">
            <div className="checkout__list">
              <Typography variant="h4">Products in your list</Typography>
              <FlipMove>
                {cart?.map((product, index) => (
                  <Card key={index} className="chekout__productCard">
                    <CardContent>
                      <h3>{product.name}</h3>
                      <PriceDisplay price={product.price} />
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => {
                          removeProduct(product._id);
                        }}
                      >
                        <RemoveShoppingCartIcon style={{ color: "#FF3031" }} />
                      </IconButton>
                    </CardActions>
                  </Card>
                ))}
              </FlipMove>
            </div>
            <div className="checkout__summary">
              <Typography variant="h4">Payment Information</Typography>
              <Card>
                <CardContent>
                  <SubTotal cart={cart} />
                  <h3>Delivery Address</h3>
                  <br />
                  <CssTextField
                    variant="outlined"
                    fullWidth
                    label="Address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </CardContent>
                <span className="checkout__helpetText">
                  First fill address then payment option will open
                </span>
              </Card>
            </div>
          </div>
        </CardContent>
        {/* render card only cart is not empty and address field is filled */}
        {cart?.length > 0 && address?.length > 4 && (
          <div className="checkout__paymentCard">
            <Typography variant="h4" align="center">
              Payment
            </Typography>
            <div className="checkout__dropin">
              {clientToken !== null ? (
                <>
                  <DropIn
                    options={{ authorization: clientToken.clientToken }}
                    onInstance={(instance) => (clientToken.instance = instance)}
                  />
                  <Button
                    onClick={onPurchase}
                    variant="contained"
                    fullWidth={true}
                    disabled={isLoading}
                  >
                    PURCHASE
                  </Button>
                </>
              ) : (
                <h4>Loading...</h4>
              )}
            </div>
          </div>
        )}
      </Card>
    </BaseLayout>
  );
}

export default Checkout;
