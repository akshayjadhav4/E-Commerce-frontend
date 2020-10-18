import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CssTextField } from "../CssTextField/CssTextField";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  createCategory,
  clearCategoriesMessage,
} from "../../features/category/categorySlice";
import { selectError, clearError } from "../../features/error/errorSlice";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";

const initialValues = {
  name: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
});

function AddCategory() {
  const dispatch = useDispatch();

  // getting error from store
  const error = useSelector(selectError);
  const { message, isLoading } = useSelector(selectCategories);
  const { user, token } = useSelector(selectAuthentication);

  const onSubmit = (values, { resetForm }) => {
    dispatch(createCategory(user._id, token, values));
    resetForm();
  };

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearCategoriesMessage());
  }, [dispatch]);

  return (
    <div className="addCategory">
      <Typography variant="h4">Add Category</Typography>
      <hr />
      <br />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
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
              <Card variant="outlined">
                <CardContent>
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
                </CardContent>
                <CardActions>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting || isLoading}
                  >
                    Submit
                  </Button>
                  {isLoading && <CircularProgress />}
                </CardActions>
              </Card>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddCategory;
