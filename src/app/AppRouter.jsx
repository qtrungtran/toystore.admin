import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import routes from "./app.routes";
import nProgress from "nprogress";
import { localAuthenticate } from "utils/localAuth";

const RouteFallback = () => {
  useEffect(() => {
    nProgress.start();
    return () => {
      nProgress.done();
      nProgress.remove();
    };
  }, []);
  return null;
};

const AppRouter = () => {
  const { isAuthenticated } = localAuthenticate();
  return (
    <Router>
      <Switch>
        <Suspense fallback={<RouteFallback />}>
          {Object.entries(routes).map(([routeKey, routeConfig]) => {
            return <Route key={routeKey} {...routeConfig} />;
          })}
          <Route exact path="/">
            {isAuthenticated ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
        </Suspense>
      </Switch>
    </Router>
  );
};

export default AppRouter;
