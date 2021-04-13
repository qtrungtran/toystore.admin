import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import TextInput from "components/inputs/TextInput";
import { useDispatch } from "react-redux";
import { resetPassword } from "state/modules/auth/authSlice";
import useNotification from "utils/hooks/notification";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const PasswordResetPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showSuccess, showError } = useNotification();
  
  return (
    <Page className={classes.root} title="Reset Password">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: "demo@devias.io",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Must be a valid email")
                .max(255)
                .required("Email is required"),
            })}
            onSubmit={({ email }, { setSubmitting }) => {
              dispatch(
                resetPassword({
                  email,
                  onComplete: (error) => {
                    setSubmitting(false);
                    if (!error) {
                      showSuccess("Sent request successfully.");
                      return;
                    }
                    const errorMessages = Object.values(error).join(". ");
                    showError(errorMessages);
                    return;
                  },
                })
              );
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Password Reset
                  </Typography>
                  <Typography color="textSecondary" variant="body1">
                    Please enter your email to search for your account.
                  </Typography>
                </Box>
                <Field
                  label="Email Address"
                  margin="normal"
                  name="email"
                  component={TextInput}
                  fullWidth
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
                    Reset
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

export default compose(withLayout("main"))(PasswordResetPage);
