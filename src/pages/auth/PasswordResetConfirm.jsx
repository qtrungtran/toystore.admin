import React, { useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles
} from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import TextInput from "components/inputs/TextInput";
import qs from "qs";
import { confirmResetPassword } from "state/modules/auth/authSlice";
import { useDispatch } from "react-redux";
import useNotification from "utils/hooks/notification";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  checkBox: {
    padding: 0,
    paddingRight: "9px"
  }
}));

const PasswordResetConfirmPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useNotification();
  const history = useHistory();
  const { search } = useLocation();
  const key = useMemo(() => {
    return qs.parse(search.replace(/^\?/, "")).key;
  }, [search]);

  return (
    <Page className={classes.root} title="Confirm Reset Password">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        mt={2}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              password1: "",
              password2: ""
            }}
            validationSchema={Yup.object().shape({
              password1: Yup.string()
                .min(8, "Password must be at least 8 characters long")
                .max(255)
                .matches(
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z\d])/,
                  "Password must contain at least 1 number, 1 capital letter, 1 special character"
                )
                .required("Password is required"),
              password2: Yup.string()
                .max(255)
                .required("Confirm Password is required")
            })}
            onSubmit={({ password1, password2 }, { setSubmitting }) => {
              dispatch(
                confirmResetPassword({
                  activation_key: key,
                  password1,
                  password2,
                  onComplete: (error) => {
                    setSubmitting(false);
                    if (!error) {
                      showSuccess("your password has beed reset successfully!");
                      history.push("/login");
                      return;
                    }
                    const errorMessages = Object.values(error).join(". ");
                    showError(errorMessages);
                    return;
                  }
                })
              );
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Password Reset Confirm
                  </Typography>
                  <Typography color="textSecondary" variant="body1">
                    Please enter your password.
                  </Typography>
                </Box>
                <Field
                  label="Password"
                  margin="normal"
                  name="password1"
                  component={TextInput}
                  fullWidth
                  type="password"
                />
                <Field
                  label="Confirm Password"
                  margin="normal"
                  name="password2"
                  component={TextInput}
                  fullWidth
                  type="password"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Confirm now
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default compose(withLayout("main"))(PasswordResetConfirmPage);
