import React from "react";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "../../features/cart/cartSlice";

function SubTotal({ cart }) {
  return (
    <div className="subTotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <h4>
              Subtotal ({cart?.length} items) : <strong>{value}</strong>
            </h4>
          </>
        )}
        decimalScale={2}
        value={getBasketTotal(cart)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
      />
    </div>
  );
}

export default SubTotal;
