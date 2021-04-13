import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Formik, Form } from "formik";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import useNotification from "utils/hooks/notification";
import userAPI from "api/user";

const useStyles = makeStyles(() => ({
  root: {},
  cardActions: {
    justifyContent: "space-between",
  },
  input: {
    display: "none",
  },
  avatar: {
    height: 200,
    width: 200,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#122230",
    "&:hover": {
      backgroundColor: "#122230ed",
    },
  },
}));

const Profile = ({ className, user, fetchUser, ...rest }) => {
  const classes = useStyles();
  const { showSuccess } = useNotification();
  const [image, setImage] = useState({});
  const onFileUpload = async () => {
    // e.preventDefault();
    try {
      if (image !== "") {
        // Creating a FormData object
        let fileData = new FormData();
        // Setting the 'image' field and the selected file
        fileData.set("image", image, `${image.lastModified}-${image.name}`);
        // await axios({
        //   method: "put",
        //   url: "http://localhost:3000/users/4/avatar",
        //   data: fileData,
        //   headers: { "Content-Type": "multipart/form-data" },
        // });
        await userAPI.uploadAvatar(fileData, user.id);
        fetchUser();
        showSuccess("Editted successfully.");
      }
    } catch (error) {
      console.log("Failed to edit user: ", error);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{}}
      onSubmit={onFileUpload}
    >
      {({ isSubmitting }) => (
        <Form>
          <Card className={clsx(classes.root, className)} {...rest}>
            <CardContent>
              <Box alignItems="center" display="flex" flexDirection="column">
                <Avatar className={classes.avatar} src={user.avatar} />
                <Typography color="textPrimary" gutterBottom variant="h3">
                  {user.username}
                </Typography>
              </Box>
            </CardContent>
            <Divider />
            <CardActions className={classes.cardActions}>
              <input
                name="image"
                className={classes.input}
                id="contained-button-file"
                type="file"
                onChange={(e) => {
                  setImage(e.target.files[0]);
                }}
              />
              <label
                htmlFor="contained-button-file"
                style={{ marginLeft: 0, flexBasis: "45%" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component="span"
                  size="large"
                  className={classes.button}
                >
                  Choose file
                </Button>
              </label>
              <Button
                color="primary"
                disabled={isSubmitting}
                size="large"
                type="submit"
                variant="contained"
                style={{ marginLeft: 0, flexBasis: "45%" }}
                className={classes.button}
              >
                Upload
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
