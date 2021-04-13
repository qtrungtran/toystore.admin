import routes from "app/app.routes";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { actions as authActions } from "state/modules/auth/authSlice";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  React.useEffect(() => {
    dispatch(authActions.logout());
    history.push(routes['auth/login'].path);
  });
  return null;
};

export default LogoutPage;
