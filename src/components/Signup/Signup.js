import React, { useEffect } from "react";
import "./Signup.css";
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
  signup,
  selectAuthentication,
} from "../../features/authentication/authenticationSlice";
import { selectError, clearError } from "../../features/error/errorSlice";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "50ch",
  },
}));

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Inavalid email format").required("Required"),
  password: Yup.string()
    .min(6, "Min 6 character required")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Password must match")
    .min(6, "Min 6 character required")
    .required("Required"),
});

function Signup() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // getting authentication state from store
  const { user, isLoading } = useSelector(selectAuthentication);
  // getting error from store
  const error = useSelector(selectError);

  const onSubmit = (values, { resetForm }) => {
    // onsubmit take all values and dispath signup
    dispatch(signup(values));
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
    <BaseLayout title="Create an account">
      <div className="signup">
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
                  error={errors.firstName && touched.firstName}
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.firstName && touched.firstName && errors.firstName
                  }
                />
                <br />
                <br />
                <CssTextField
                  variant="outlined"
                  className={classes.textField}
                  error={errors.lastName && touched.lastName}
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.lastName && touched.lastName && errors.lastName
                  }
                />
                <br />
                <br />
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
                <CssTextField
                  variant="outlined"
                  className={classes.textField}
                  error={errors.confirmPassword && touched.confirmPassword}
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword
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
          <Link to="/signin" className="signup__link">
            Already have an account!
          </Link>
        </Button>
      </div>
      {performRedirect()}
    </BaseLayout>
  );
}

export default Signup;
