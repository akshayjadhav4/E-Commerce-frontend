import React from "react";
import "./Signin.css";
import BaseLayout from "../Base Layout/BaseLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { CssTextField } from "../CssTextField/CssTextField";

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

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    console.log(values);
    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  return (
    <BaseLayout title="Sign In">
      <div className="signin">
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
                  disabled={isSubmitting}
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
    </BaseLayout>
  );
}

export default Signin;
