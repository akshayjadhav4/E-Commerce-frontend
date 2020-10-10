import React from "react";
import CurrencyFormat from "react-currency-format";
import { Typography } from "@material-ui/core";

function PriceDisplay({ price }) {
  return (
    <CurrencyFormat
      renderText={(value) => (
        <>
          <Typography variant="h6" color="textSecondary" component="p">
            <strong>Price: {value}</strong>
          </Typography>
        </>
      )}
      decimalScale={2}
      value={price}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"₹"}
    />
  );
}

export default PriceDisplay;
