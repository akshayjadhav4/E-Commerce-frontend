import React, { useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { CssTextField } from "../CssTextField/CssTextField";
import { useSelector, useDispatch } from "react-redux";
import {
  getCategories,
  selectCategories,
} from "../../features/category/categorySlice";
import { selectError, clearError } from "../../features/error/errorSlice";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";
import {
  selectProducts,
  createProduct,
  clearProductMessage,
} from "../../features/products/productsSlice";

const initialValues = {
  name: "",
  photo: null,
  description: "",
  price: "",
  category: "",
  stock: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  photo: Yup.mixed().required("Image Required"),
  description: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  category: Yup.string().required("Required"),
  stock: Yup.number().required("Required"),
});

function AddProduct() {
  const dispatch = useDispatch();

  const { categories } = useSelector(selectCategories);
  const error = useSelector(selectError);
  const { user, token } = useSelector(selectAuthentication);
  const { productMessage, isLoading } = useSelector(selectProducts);

  const onSubmit = (values, { resetForm }) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("photo", values.photo);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("stock", values.stock);
    dispatch(createProduct(user._id, token, formData));
    resetForm();
  };

  //   getting categories for showing in dropdown menu
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    //clearing all prvious product related messages.
    dispatch(clearProductMessage());
    dispatch(clearError());
  }, [dispatch]);
  return (
    <div className="addProduct">
      <Typography variant="h4">Add Product</Typography>
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
            setFieldValue,
          } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Card variant="outlined">
                <CardContent>
                  {/* Alert to show error */}
                  {error && <Alert severity="error">{error}</Alert>}
                  {/* Alert to show Success */}
                  {productMessage && (
                    <Alert severity="success">{productMessage}</Alert>
                  )}
                  <br />
                  <div className="addProduct__imageUpload">
                    <label>
                      <input
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a Image"
                        onBlur={handleBlur}
                        onChange={(event) => {
                          setFieldValue("photo", event.currentTarget.files[0]);
                        }}
                      />
                    </label>
                    <span style={{ color: "red" }}>
                      {touched?.photo && errors?.photo}
                    </span>
                  </div>
                  <br />
                  <CssTextField
                    variant="outlined"
                    fullWidth
                    error={errors.name && touched.name}
                    label="Product Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.name && touched.name && errors.name}
                  />
                  <br />
                  <br />
                  <CssTextField
                    variant="outlined"
                    fullWidth
                    multiline
                    error={errors.description && touched.description}
                    label="Product Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={
                      errors.description &&
                      touched.description &&
                      errors.description
                    }
                  />
                  <br />
                  <br />
                  <CssTextField
                    variant="outlined"
                    fullWidth
                    error={errors.price && touched.price}
                    label="Product Price"
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.price && touched.price && errors.price}
                  />
                  <br />
                  <br />
                  <InputLabel>Select Product Category</InputLabel>
                  <FormControl>
                    <Select
                      variant="outlined"
                      name="category"
                      error={errors.category && touched.category}
                      value={values.category}
                      onChange={handleChange}
                    >
                      {categories.map((category) => (
                        <MenuItem value={category._id} key={category._id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <br />
                  <br />
                  <CssTextField
                    variant="outlined"
                    fullWidth
                    error={errors.stock && touched.stock}
                    label="Product Available Stock"
                    name="stock"
                    value={values.stock}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.stock && touched.stock && errors.stock}
                  />
                  <br />
                  <br />
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
                </CardActions>
              </Card>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

export default AddProduct;
