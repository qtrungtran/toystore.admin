import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
} from "@material-ui/core";
import TextInput from "components/inputs/TextInput";
import userAPI from "api/user";
import useNotification from "utils/hooks/notification";

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    backgroundColor: "#122230",
    "&:hover": {
      backgroundColor: "#122230ed",
    },
  },
}));

const ProfileDetails = ({ className, user, ...rest }) => {
  const classes = useStyles();
  const { showSuccess } = useNotification();
  const [values, setValues] = useState({
    firstName: "Katarina",
    lastName: "Smith",
    email: "demo@devias.io",
    phone: "",
    state: "Alabama",
    country: "USA",
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
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
      onSubmit={async ({ username, email, phoneNumber, address }) => {
        try {
          const response = await userAPI.edit(
            { username, email, phoneNumber, address },
            user.id
          );
          // onFileUpload();
          showSuccess("Editted successfully.");
        } catch (error) {
          console.log("Failed to edit user: ", error);
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Card>
            <CardHeader title="Profile" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Field
                    label="Username"
                    margin="normal"
                    name="username"
                    component={TextInput}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    label="Email"
                    margin="normal"
                    name="email"
                    component={TextInput}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    label="Phone number"
                    margin="normal"
                    name="phoneNumber"
                    component={TextInput}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    label="Address"
                    margin="normal"
                    name="address"
                    component={TextInput}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.button}
              >
                Save details
              </Button>
            </Box>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string,
};

export default ProfileDetails;
