import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import TextInput from "components/inputs/TextInput";
import { signin } from "state/modules/auth/authSlice";
import { useDispatch } from "react-redux";
import useNotification from "utils/hooks/notification";
import routes from "app/app.routes";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  button: {
    backgroundColor: "#122230",
    "&:hover": {
      backgroundColor: "#122230ed",
    },
  },
  link: {
    color: "#122230",
  },
}));

const LoginPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showError } = useNotification();
  const history = useHistory();

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required("Username is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={({ username, password }, { setSubmitting }) => {
              dispatch(
                signin({
                  username,
                  password,
                  onComplete: (error, data) => {
                    setSubmitting(false);
                    if (!error) {
                      // handle login success
                      history.push(routes["dashboard"].path);
                      return;
                    }
                    const errorMessages = Object.values(error).join(". ");
                    return showError(errorMessages);
                  },
                })
              );
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Đăng nhập
                  </Typography>
                </Box>
                <Field
                  label="Tên đăng nhập"
                  margin="normal"
                  name="username"
                  component={TextInput}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                <Field
                  label="Mật khẩu"
                  margin="normal"
                  name="password"
                  type="password"
                  component={TextInput}
                  fullWidth
                  variant="outlined"
                  size="small"
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
                    Đăng nhập
                  </Button>
                </Box>
                {/* <Typography color="textSecondary" variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link
                    component={RouterLink}
                    to={routes["auth/register"].path}
                    variant="h6"
                    className={classes.link}
                  >
                    Sign up
                  </Link>
                </Typography>
                <Typography color="textSecondary" variant="body1">
                  <Link
                    component={RouterLink}
                    to={routes["auth/password-reset"].path}
                    variant="h6"
                    className={classes.link}
                  >
                    Forgotten password
                  </Link>
                </Typography> */}
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default compose(withLayout("main"))(LoginPage);
