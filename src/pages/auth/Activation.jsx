import React, { useEffect, useCallback } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import {
  Box,
  Link,
  Typography,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import qs from "qs";
import useNotification from "utils/hooks/notification";
import { useDispatch, useSelector } from "react-redux";
import { activate } from "state/modules/auth/authSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const ActivationPage = () => {
  const classes = useStyles();
  const { search } = useLocation();
  const { showSuccess, showError } = useNotification();
  const dispatch = useDispatch();
  const { activating } = useSelector((state) => state.auth.activation);
  const history = useHistory();
  const onActivateCompleted = useCallback(
    (error) => {
      if (!error) {
        showSuccess("Your account has beed activated.");
        history.push("/login");
        return;
      }
      const errorMessages = Object.values(error).join(". ");
      showError(errorMessages);
    },
    [] // eslint-disable-line
  );

  useEffect(() => {
    const { key } = qs.parse(search.replace(/^\?/, ""));

    dispatch(
      activate({
        key,
        onComplete: onActivateCompleted,
      })
    );
  }, [search, dispatch, onActivateCompleted]);

  return (
    <Page className={classes.root} title="Activation  ">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          mb={3}
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography
            color="textPrimary"
            variant="h3"
            style={{ marginBottom: 12 }}
          >
            Activating
          </Typography>
          {activating && <CircularProgress />}
        </Box>

        <Box mt={4}>
          <Typography color="textSecondary" variant="body1">
            Thank you!
          </Typography>
          <Typography color="textSecondary" variant="body1">
            <Link component={RouterLink} to="/">
              The Sampra Team
            </Link>
          </Typography>
        </Box>
      </Box>
    </Page>
  );
};

export default compose(withLayout("main"))(ActivationPage)

