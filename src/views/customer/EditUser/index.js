import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import qs from "qs";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import UserAvatar from "./UserAvatar";
import UserDetails from "./UserDetails";
import userAPI from "api/user";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const EditUser = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    avatar: "",
  });
  const { search } = useLocation();
  const { id } = qs.parse(search.replace(/^\?/, ""));

  useEffect(() => {
    fetchUser(id);
  }, []);

  const fetchUser = async (id) => {
    try {
      const response = await userAPI.get(id);
      const fetchedUser = response.data.user;
      setUser({
        username: fetchedUser.username,
        email: fetchedUser.email,
        phoneNumber: fetchedUser.phoneNumber,
        address: fetchedUser.address,
        avatar: fetchedUser.avatar,
      });
    } catch (error) {
      console.log("Failed to fetch user: ", error);
    }
  };

  return (
    <Page className={classes.root} title="Edit user">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <UserAvatar user={{ ...user }} id={id} fetchUser={fetchUser} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <UserDetails user={{ ...user }} id={id} fetchUser={fetchUser} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(EditUser);
