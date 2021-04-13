import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import TextInput from "components/inputs/TextInput";
import { useDispatch } from "react-redux";
import { signup } from "state/modules/auth/authSlice";
import useNotification from "utils/hooks/notification";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#fff',
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  button: {
    backgroundColor: '#122230',
    "&:hover": {
      backgroundColor: '#122230ed',
    },
  },
  link: {
    color: '#122230'
  }
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  first_name: Yup.string().max(255).required("First name is required"),
  last_name: Yup.string().max(255).required("Last name is required"),
  password1: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .max(255)
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z\d])/,
      "Password must contain at least 1 number, 1 capital letter, 1 lowercase letter, 1 special character"
    )
    .required("Password is required"),
  password2: Yup.string()
    .required("Confirmation password is required")
    .oneOf([Yup.ref("password1")], "Passwords must match"),
  policy: Yup.boolean().oneOf([true], "This field must be checked"),
});

const RegisterPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showSuccess, showError, showInfo } = useNotification();
  const history = useHistory();

  return (
    <Page className={classes.root} title="Register">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "",
              username: "",
              password1: "",
              password2: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, setErrors }) => {
              const {
                email,
                username,
                password1,
                password2,
              } = values;
              const onComplete = (error, data) => {
                setSubmitting(false);
                if (!error) {
                  showSuccess("Registered successfully.");
                  history.push("/login");
                  showInfo("Please confirm the email.");
                  return;
                }
                const errorMessages = Object.values(error);
                showError(errorMessages.join(". "));
                setErrors(error);
                return;
              };
              dispatch(
                signup({
                  email,
                  username,
                  password1,
                  password2,
                  onComplete,
                })
              );
            }}
          >
            {({ errors, handleChange, isSubmitting, touched, values }) => (
              <Form>
                <Box>
                  <Typography color="textPrimary" variant="h2">
                    Sign up
                  </Typography>
                </Box>
                <Field
                  label="Username"
                  margin="normal"
                  name="username"
                  component={TextInput}
                  fullWidth
                  variant="outlined"
                />
                <Field
                  label="Email Address"
                  margin="normal"
                  name="email"
                  component={TextInput}
                  fullWidth
                  variant="outlined"
                />
                <Field
                  label="Password"
                  margin="normal"
                  name="password1"
                  component={TextInput}
                  type="password"
                  fullWidth
                  variant="outlined"
                />
                <Field
                  label="Password confirmation"
                  margin="normal"
                  name="password2"
                  component={TextInput}
                  fullWidth
                  type="password"
                  variant="outlined"
                />
                
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    className={classes.button}
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Have an account?{" "}
                  <Link component={RouterLink} to="/login" variant="h6" className={classes.link}>
                    Sign in
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default compose(withLayout("main"))(RegisterPage);
