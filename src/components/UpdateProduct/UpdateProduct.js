import React, { useEffect } from "react";
import "./UpdateProduct.css";
import BaseLayout from "../Base Layout/BaseLayout";
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
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { CssTextField } from "../CssTextField/CssTextField";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectProducts,
  updateProduct,
} from "../../features/products/productsSlice";
import {
  getCategories,
  selectCategories,
} from "../../features/category/categorySlice";
import { selectError } from "../../features/error/errorSlice";
import { selectAuthentication } from "../../features/authentication/authenticationSlice";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  photo: Yup.mixed().required("Image Required"),
  description: Yup.string().required("Required"),
  price: Yup.number().required("Required"),
  category: Yup.string().required("Required"),
  stock: Yup.number().required("Required"),
});
function UpdateProduct() {
  const { productId } = useParams();
  const dispatch = useDispatch();

  const { products, productMessage, isLoading } = useSelector(selectProducts);
  // filter products list and slect only one which we want to update
  const product = products?.filter((product) => product._id === productId);
  const { categories } = useSelector(selectCategories);
  const error = useSelector(selectError);
  const { user, token } = useSelector(selectAuthentication);

  const initialValues = {
    name: product[0]?.name,
    photo: null,
    description: product[0]?.description,
    price: product[0]?.price,
    category: product[0]?.category._id,
    stock: product[0]?.stock,
  };

  const onSubmit = (values, { resetForm }) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("photo", values.photo);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("stock", values.stock);
    dispatch(updateProduct(productId, user._id, token, formData));
    resetForm();
  };

  //   getting categories for showing in dropdown menu
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <BaseLayout title="Update Product">
      <div className="updateProduct">
        <div className="updateProduct__header">
          <Link to="/admin/manage/prodcuts" className="updateProduct__link">
            <ArrowBackIosIcon />
          </Link>
          <Typography variant="h6">{product[0]?.name}</Typography>
        </div>
        <hr />
        <br />
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
                    <div className="updateProduct__imageUpload">
                      <label>
                        <input
                          type="file"
                          name="photo"
                          accept="image"
                          placeholder="choose a Image"
                          onBlur={handleBlur}
                          onChange={(event) => {
                            setFieldValue(
                              "photo",
                              event.currentTarget.files[0]
                            );
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
    </BaseLayout>
  );
}

export default UpdateProduct;
