import React, { useEffect } from "react";
import "./Signin.css";
import BaseLayout from "../Base Layout/BaseLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { CssTextField } from "../CssTextField/CssTextField";
import { useSelector, useDispatch } from "react-redux";
import {
  signin,
  selectAuthentication,
} from "../../features/authentication/authenticationSlice";
import { selectError, clearError } from "../../features/error/errorSlice";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "50ch",
  },
}));

const initialValues = {
  email: "account@test.com",
  password: "123456",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Inavalid email format").required("Required"),
  password: Yup.string()
    .min(6, "Min 6 character required")
    .required("Required"),
});

function Signin() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // getting authentication state from store
  const { user, isLoading } = useSelector(selectAuthentication);
  // getting error from store
  const error = useSelector(selectError);

  const onSubmit = (values, { resetForm }) => {
    // onsubmit take all values and dispath signin
    dispatch(signin(values));
    resetForm();
  };

  // redirect user based on role
  const performRedirect = () => {
    if (user) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
  };

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  return (
    <BaseLayout title="Sign In">
      <div className="signin">
        {/* Alert to show error */}
        {error && <Alert severity="error">{error}</Alert>}
        {isLoading && <CircularProgress />}

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
                <CssTextField
                  variant="outlined"
                  className={classes.textField}
                  error={errors.email && touched.email}
                  label="Email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={errors.email && touched.email && errors.email}
                />
                <br />
                <br />
                <CssTextField
                  variant="outlined"
                  className={classes.textField}
                  error={errors.password && touched.password}
                  label="Password"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.password && touched.password && errors.password
                  }
                />
                <br />
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
        <Button href="" color="primary">
          <Link to="/signup" className="signin__link">
            Create an account
          </Link>
        </Button>
        <p>Login credentials already filled for test account(Customer).</p>
      </div>
      {performRedirect()}
    </BaseLayout>
  );
}

export default Signin;
