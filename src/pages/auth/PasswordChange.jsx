import React from "react";
import { useHistory } from "react-router-dom";
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
import { changePassword } from "state/modules/auth/authSlice";
import { useDispatch } from "react-redux";
import useNotification from "utils/hooks/notification";
import withAuth from "components/hocs/withAuth";
import routes from "app/app.routes";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const PasswordChangePage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showError } = useNotification();
  const history = useHistory();

  return (
    <Page className={classes.root} title="Change Password">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              old_password: "",
              new_password1: "",
              new_password2: ""
            }}
            validationSchema={Yup.object().shape({
              old_password: Yup.string()
                .max(255)
                .required("Old password is required"),
              new_password1: Yup.string()
                .min(8, "New password must be at least 8 characters long")
                .max(255)
                .matches(
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z\d])/,
                  "New password must contain at least 1 number, 1 capital letter, 1 special character"
                )
                .required("New password is required"),
              new_password2: Yup.string()
                .max(255)
                .required("New password confirmation is required")
                .oneOf([Yup.ref("new_password1")], "Passwords must match")
            })}
            onSubmit={(
              { old_password, new_password1, new_password2 },
              { setSubmitting }
            ) => {
              dispatch(
                changePassword({
                  old_password,
                  new_password1,
                  new_password2,
                  onComplete: (error, data) => {
                    setSubmitting(false);
                    if (!error) {
                      // handle change password success
                      history.push(routes["auth/login"].path);
                      return;
                    }
                    const errorMessages = Object.values(error).join(". ");
                    return showError(errorMessages);
                  }
                })
              );
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Change password
                  </Typography>
                </Box>
                <Field
                  label="Old password"
                  margin="normal"
                  name="old_password"
                  type="password"
                  component={TextInput}
                  fullWidth
                />
                <Field
                  label="New password"
                  margin="normal"
                  name="new_password1"
                  type="password"
                  component={TextInput}
                  fullWidth
                />
                <Field
                  label="New password confirmation"
                  margin="normal"
                  type="password"
                  name="new_password2"
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
                    Submit
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

export default compose(withAuth, withLayout("main"))(PasswordChangePage);
