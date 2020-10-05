import React from "react";
import "./Signup.css";
import BaseLayout from "../Base Layout/BaseLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  textField: {
    width: "50ch",
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#f46d4f",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#f46d4f",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c4c4c4",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#f46d4f",
      },
    },
  },
})(TextField);

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

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log(values);
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  return (
    <BaseLayout title="Create an account">
      <div className="signup">
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
                  disabled={isSubmitting}
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
    </BaseLayout>
  );
}

export default Signup;
