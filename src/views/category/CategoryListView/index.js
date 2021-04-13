import React from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import Results from "./Results";
import Toolbar from "./Toolbar";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const CategoryListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Categories">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results />
        </Box>
      </Container>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(CategoryListView);
