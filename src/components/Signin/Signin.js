import React, { useEffect } from "react";
import "./Signin.css";
import BaseLayout from "../Base Layout/BaseLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import { CssTextField } from "../CssTextField/CssTextField";
import { useSelector, useDispatch } from "react-redux";
import {
  signin,
  isAuthenticated,
  selectAuthentication,
} from "../../features/authentication/authenticationSlice";
import { selectError } from "../../features/error/errorSlice";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "50ch",
  },
}));

const initialValues = {
  email: "",
  password: "",
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

  // to check user is already logged in
  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);

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

  return (
    <BaseLayout title="Sign In">
      <div className="signin">
        {/* Alert to show error */}
        {error && <Alert severity="error">{error}</Alert>}
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
      </div>
      {performRedirect()}
    </BaseLayout>
  );
}

export default Signin;
