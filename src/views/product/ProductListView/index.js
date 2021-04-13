import React, { useState } from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import Toolbar from "./Toolbar";
import Results from "./Results";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    // paddingTop: theme.spacing(3),
  },
  productCard: {
    height: "100%",
  },
}));

const ProductList = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Products">
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Box>
          <Results />
        </Box>
        {/* <Box mt={3} display="flex" justifyContent="center">
          <Pagination color="primary" count={3} size="small" />
        </Box> */}
      </Container>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(ProductList);
