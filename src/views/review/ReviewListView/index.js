import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ReviewListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Users">
      <Container maxWidth={false}>
        <Box>
          <Results />
        </Box>
      </Container>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(ReviewListView);
