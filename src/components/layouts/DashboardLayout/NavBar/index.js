import React, { useEffect, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  List as CategoriesIcon,
  Star as ReviewsIcon,
} from "react-feather";
import NavItem from "./NavItem";
import userAPI from "api/user";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  jobTitle: "Senior Developer",
  name: "Katarina Smith",
};

const items = [
  {
    href: "/dashboard",
    icon: BarChartIcon,
    title: "Dashboard",
  },
  {
    href: "/users",
    icon: UsersIcon,
    title: "Người dùng",
  },
  {
    href: "/categories",
    icon: CategoriesIcon,
    title: "Danh mục sản phẩm",
  },
  // {
  //   href: "/statuses",
  //   icon: UsersIcon,
  //   title: "Statuses",
  // },
  {
    href: "/products",
    icon: ShoppingBagIcon,
    title: "Sản phẩm",
  },
  {
    href: "/orders",
    icon: ShoppingBagIcon,
    title: "Đơn hàng",
  },
  {
    href: "/reviews",
    icon: ReviewsIcon,
    title: "Đánh giá sản phẩm",
  },
  // {
  //   href: "/account",
  //   icon: UserIcon,
  //   title: "Account",
  // },
  // {
  //   href: "/settings",
  //   icon: SettingsIcon,
  //   title: "Settings",
  // },
  // {
  //   href: "/login",
  //   icon: LockIcon,
  //   title: "Login",
  // },
  // {
  //   href: "/register",
  //   icon: UserPlusIcon,
  //   title: "Register",
  // },
  // {
  //   href: "/404",
  //   icon: AlertCircleIcon,
  //   title: "Error",
  // },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 70,
    height: "calc(100% - 70px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
    marginBottom: 8,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = useState({ avatar: "", username: "" });

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line
  }, [location.pathname]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userAPI.getProfile();
        const fetchedUser = response.data.user;
        setUser({
          username: fetchedUser.username,
          avatar: fetchedUser.avatar,
        });
      } catch (error) {
        console.log("Failed to fetch user: ", error);
      }
    };
    fetchUser();
  }, []);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/profile"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.username}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
