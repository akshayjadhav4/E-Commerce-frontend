import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CardMedia } from "@material-ui/core";
import { API } from "../../api/backend";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));
function ImageHelper({ product }) {
  const classes = useStyles();

  const imageUrl = product
    ? `${API}/product/photo/${product._id}`
    : `https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <CardMedia
      className={classes.media}
      title={product?.name}
      image={imageUrl}
    />
  );
}

export default ImageHelper;
