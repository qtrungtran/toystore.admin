import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  makeStyles,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@material-ui/core";
import TextInput from "components/inputs/TextInput";
import { signin } from "state/modules/auth/authSlice";
import { useDispatch } from "react-redux";
import useNotification from "utils/hooks/notification";
import routes from "app/app.routes";
import userAPI from "api/user";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.dark,
    // height: "100%",
    // paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3),
  },
  button: {
    backgroundColor: "#122230",
    "&:hover": {
      backgroundColor: "#122230ed",
    },
  },
}));

const UserDetails = ({ user, id, fetchUser }) => {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { showError, showSuccess } = useNotification();
  const history = useHistory();

  return (
    // <Page className={classes.root} title="Add user">
    //   <Box
    //     display="flex"
    //     flexDirection="column"
    //     // height="100%"
    //     justifyContent="center"
    //   >
    //     <Container>
    <Formik
      enableReinitialize={true}
      initialValues={{
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        address: user.address,
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().max(255).required("Username is required"),
        email: Yup.string().email().required("Email is required"),
        // password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (
        { username, email, phoneNumber, address },
        { setSubmitting }
      ) => {
        try {
          const response = await userAPI.edit(
            { username, email, phoneNumber, address },
            id
          );
          // onFileUpload();
          await fetchUser(id);
          showSuccess("Lưu thành công");
          // history.push("/users");
        } catch (error) {
          console.log("Failed to edit user: ", error);
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Card>
            <CardHeader title="Thông tin cá nhân" />
            <Divider />
            <CardContent>
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
                  onChange={(e) => {
                    // setUser({
                    //   ...user,
                    //   avatar: e.target.files[0]
                    // })
                    console.log(e.target.files);
                  }}
                /> */}
              {/* <input name="avatar" type="file"
                  onChange={(e) => {
                    setUser({
                      ...user,
                      avatar: e.target.files[0]
                    })
                    console.log(e.target.files);
                  }}
                /> */}
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                className={classes.button}
              >
                Lưu thông tin
              </Button>
            </Box>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export default UserDetails;
