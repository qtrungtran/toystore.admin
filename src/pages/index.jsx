import React from "react";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import { Box, makeStyles, Typography } from "@material-ui/core";
import Page from "components/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Page title="Sampra" className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        marginLeft="2rem"
        marginBottom="2rem"
      >
        <Typography variant="h2">Landing Page</Typography>
      </Box>
    </Page>
  );
};

export default compose(withLayout("main"))(Home)