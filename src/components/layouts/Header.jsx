import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
  Hidden,
} from "@material-ui/core";
// import MenuIcon from "@material-ui/icons/Menu";
// import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import Logo from "components/Logo";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import routes from "app/app.routes";
import { get } from "lodash";
import MenuIcon from "@material-ui/icons/Menu";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    fontSize: "1rem",
    height: 70,
    justifyContent: "center",
    backgroundColor: "#122230",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  nav: {
    "& *": {
      color: theme.palette.common.white,
    },
  },
}));

const useMenuLinkStyles = makeStyles((theme) => {
  return {
    root: {},
    anchor: {
      display: "flex",
      justifyContent: "center",
      cursor: "pointer",
    },
    dropdown: {
      backgroundColor: theme.palette.background.default,
    },
    menuItem: {},
  };
});

const MenuLink = ({ routes = [], label }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useMenuLinkStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      {/* <Box className={classes.anchor} onClick={handleClick}>
        <Typography>{label}</Typography>
        <ArrowDropDownIcon />
      </Box> */}
      {/* <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{
          list: classes.dropdown
        }}
      >
        {routes.map((route, index) => {
          return (
            <MenuItem key={index}>
              <RouterLink to={route.path}>
                <Typography>{get(route, "meta.title")}</Typography>
              </RouterLink>
            </MenuItem>
          );
        })}
      </Menu> */}
    </div>
  );
};

const Header = ({ className, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const authState = useSelector((state) => state.auth.authState);
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <IconButton>
            <Logo />
          </IconButton>
        </RouterLink>
        {onMobileNavOpen && (
          <Hidden lgUp>
            <IconButton color="inherit" onClick={onMobileNavOpen}>
              <MenuIcon />
            </IconButton>
          </Hidden>
        )}
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          flexGrow={1}
          className={classes.nav}
        >
          {/* <MenuLink
            label="Member Application"
            routes={[
              routes["account"],
              routes["users"]
            ]}
          /> */}
          <Box width="1rem" />
          {authState.isAuthenticated ? (
            <RouterLink to={routes["auth/logout"].path}>
              <IconButton color="inherit">
                <InputIcon />
              </IconButton>
              {/* <Typography>Log Out</Typography> */}
            </RouterLink>
          ) : (
            <RouterLink to={routes["auth/login"].path}>
              <IconButton color="inherit">
                <InputIcon />
              </IconButton>
              {/* <Typography>Login</Typography> */}
            </RouterLink>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default Header;
