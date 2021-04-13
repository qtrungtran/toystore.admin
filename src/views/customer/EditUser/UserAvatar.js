import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import useNotification from "utils/hooks/notification";
import { Avatar, Button, makeStyles } from "@material-ui/core";
import { Upload as UploadIcon, Image as ImageIcon } from "react-feather";
import routes from "app/app.routes";
import userAPI from "api/user";

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    minWidth: 30,
    padding: "3px",
    backgroundColor: "#122230",
    "&:hover": {
      backgroundColor: "#122230ed",
    },
  },
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
    marginLeft: "auto",
    marginRight: "auto",
  },
  group: {
    marginLeft: "auto",
    marginRight: "auto",
    width: "fit-content",
  },
}));

const UserAvatar = ({ className, user, id, fetchUser, ...rest }) => {
  const { showError, showSuccess } = useNotification();
  const history = useHistory();
  const classes = useStyles();
  const [image, setImage] = useState({});

  const onFileUpload = async () => {
    console.log(image);
    try {
      if (image !== "") {
        let fileData = new FormData();
        fileData.set("image", image, `${image.lastModified}-${image.name}`);
        await userAPI.uploadAvatar(fileData, id);
        await fetchUser(id);
        showSuccess("Đã đổi hình đại diện");
        // history.push(routes.users.path);
      }
      console.log(user);
    } catch (error) {
      console.log("Failed to edit user: ", error);
    }
    console.log(image);
  };

  return (
    <Formik initialValues={{}} onSubmit={onFileUpload}>
      {({ isSubmitting }) => (
        <Form>
          <Avatar className={classes.avatar} src={user.avatar} />
          <input
            name="image"
            className={classes.input}
            id="contained-button-file"
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <div className={classes.group}>
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                size="large"
                className={classes.button}
              >
                <ImageIcon />
              </Button>
            </label>

            <Button
              color="primary"
              disabled={isSubmitting}
              size="large"
              type="submit"
              variant="contained"
              style={{ marginLeft: 10 }}
              className={classes.button}
            >
              <UploadIcon />
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

UserAvatar.propTypes = {
  className: PropTypes.string,
};

export default UserAvatar;
