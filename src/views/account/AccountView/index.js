import React, { useState, useEffect } from "react";
import { Container, Grid, makeStyles } from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import Profile from "./Profile";
import ProfileDetails from "./ProfileDetails";
import userAPI from "api/user";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Account = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    avatar: "",
  });
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await userAPI.getProfile();
      const fetchedUser = response.data.user;
      setUser({
        id: fetchedUser.id,
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
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile user={{ ...user }} fetchUser={fetchUser} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails user={{ ...user }} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(Account);
