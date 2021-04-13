import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import SelectInput from "components/inputs/SelectInput";
import { signin } from "state/modules/auth/authSlice";
import { useDispatch } from "react-redux";
import useNotification from "utils/hooks/notification";
import routes from "app/app.routes";
import userAPI from "api/user";
import roleAPI from "api/role";

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
}));

const AddUser = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useNotification();
  const history = useHistory();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await roleAPI.getAll();
        setRoles(response.data.roles);
      } catch (error) {
        console.log("Failed to fetch role: ", error);
      }
    };
    fetchRoles();
  }, []);

  return (
    <Page className={classes.root} title="Add user">
      <Box
        display="flex"
        flexDirection="column"
        // height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            enableReinitialize={true}
            initialValues={{
              username: "",
              email: "",
              password: "",
              roleId: "",
              phoneNumber: "",
              address: "",
              // avatar: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required("Username is required"),
              email: Yup.string().email().required("Email is required"),
              password: Yup.string().max(255).required("Password is required"),
            })}
            onSubmit={async (
              { username, email, password, roleId, phoneNumber, address },
              { setSubmitting }
            ) => {
              try {
                const response = await userAPI.add({
                  username,
                  email,
                  password,
                  roleId,
                  phoneNumber,
                  address,
                });
                showSuccess("Thêm người dùng thành công");
                history.push(routes.users.path);
              } catch (error) {
                // console.log({ error });
                showError(error.response.data);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Thêm người dùng
                  </Typography>
                </Box>
                <Field
                  label="Tên tài khoản"
                  margin="normal"
                  name="username"
                  component={TextInput}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                <Field
                  label="Email"
                  margin="normal"
                  name="email"
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
                <Field
                  name="roleId"
                  options={roles.map((role) => {
                    return {
                      key: role.id,
                      label: role.name,
                    };
                  })}
                  component={SelectInput}
                  fullWidth
                  label="Vai trò"
                />
                <Field
                  label="Số điện thoại"
                  margin="normal"
                  name="phoneNumber"
                  component={TextInput}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                <Field
                  label="Địa chỉ"
                  margin="normal"
                  name="address"
                  component={TextInput}
                  fullWidth
                  variant="outlined"
                  size="small"
                />
                {/* <Field
                  label="Avatar"
                  margin="normal"
									name="avatar"
									type="file"
                  component={TextInput}
                  fullWidth
                /> */}
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
                    Thêm
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

export default compose(withLayout("dashboard"))(AddUser);
