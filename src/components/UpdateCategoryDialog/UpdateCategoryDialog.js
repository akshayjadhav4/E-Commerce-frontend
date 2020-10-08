import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { Alert } from "@material-ui/lab";
import { CssTextField } from "../CssTextField/CssTextField";
import { useSelector, useDispatch } from "react-redux";
import { selectError } from "../../features/error/errorSlice";
import {
  selectCategories,
  updateCategory,
} from "../../features/category/categorySlice";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";

function UpdateCategoryDialog({ category }) {
  const initialValues = {
    name: category.name,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
  });

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  // getting error from store
  const error = useSelector(selectError);
  const { message, isLoading } = useSelector(selectCategories);
  const { user, token } = useSelector(selectAuthentication);

  const onSubmit = (values) => {
    dispatch(updateCategory(category._id, user._id, token, values));
  };

  return (
    <div className="UpdateCategoryDialog">
      <IconButton onClick={handleClickOpen}>
        <EditIcon className="manageCategory__editIcon" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Category</DialogTitle>

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
                  {/* Alert to show Success */}
                  {message && <Alert severity="success">{message}</Alert>}
                  <br />
                  <CssTextField
                    variant="outlined"
                    fullWidth
                    error={errors.name && touched.name}
                    label="Category Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.name && touched.name && errors.name}
                  />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || isLoading}
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

export default UpdateCategoryDialog;
