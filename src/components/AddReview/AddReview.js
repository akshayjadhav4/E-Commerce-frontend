import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Alert, Rating } from "@material-ui/lab";
import { CssTextField } from "../CssTextField/CssTextField";
import { useSelector, useDispatch } from "react-redux";
import { selectError } from "../../features/error/errorSlice";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";
import { addReview } from "../../features/products/productsSlice";
function AddReview({ productId }) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [ratingValue, setRatingValue] = useState(0);
  const initialValues = {
    content: "",
    rating: ratingValue,
  };

  const validationSchema = Yup.object({
    content: Yup.string().required("Required"),
  });

  const dispatch = useDispatch();

  const error = useSelector(selectError);
  const { user, token } = useSelector(selectAuthentication);

  const onSubmit = (values) => {
    const review = {
      content: values.content,
      rating: values.rating,
      author: user._id,
    };
    dispatch(addReview(user._id, token, productId, review));
  };
  return (
    <div className="addReview">
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Review
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Review Form</DialogTitle>

        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  {/* Alert to show error */}
                  {error && <Alert severity="error">{error}</Alert>}

                  <div className="addReview__rating">
                    <Rating
                      name="simple-controlled"
                      value={values.rating}
                      onChange={(event, newValue) => {
                        setRatingValue(newValue);
                      }}
                    />
                    <span style={{ color: "red " }}>{errors.rating}</span>
                  </div>
                  <br />
                  <CssTextField
                    variant="outlined"
                    fullWidth
                    error={errors.content && touched.content}
                    label="Message"
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.content && touched.content && errors.content
                    }
                  />
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </form>
              );
            }}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddReview;
