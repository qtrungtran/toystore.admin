import LogoutPage from "pages/auth/Logout";
import React from "react";
import { Redirect } from "react-router-dom";
import Export from "views/reports/DashboardView/Export";

const routes = {
  home: {
    path: "/",
    component: React.lazy(() => import("pages/index")),
    exact: true,
  },
  "auth/activation": {
    path: "/activation",
    component: React.lazy(() => import("pages/auth/Activation")),
    exact: true,
  },
  "auth/login": {
    path: "/login",
    component: React.lazy(() => import("pages/auth/Login")),
    exact: true,
  },
  "auth/register": {
    path: "/register",
    component: React.lazy(() => import("pages/auth/Register")),
    exact: true,
  },
  "auth/password-change": {
    path: "/password-change",
    component: React.lazy(() => import("pages/auth/PasswordChange")),
    exact: true,
  },
  "auth/password-reset": {
    path: "/password-reset",
    component: React.lazy(() => import("pages/auth/PasswordReset")),
    exact: true,
  },
  "auth/password-reset-confirm": {
    path: "/password-reset-confirm",
    component: React.lazy(() => import("pages/auth/PasswordResetConfirm")),
    exact: true,
  },
  "auth/logout": {
    path: "/logout",
    component: LogoutPage,
    exact: true,
  },
  dashboard: {
    path: "/dashboard",
    component: React.lazy(() => import("views/reports/DashboardView")),
    exact: true,
  },
  export: {
    path: "/dashboard/export",
    component: Export,
    exact: true,
  },
  profile: {
    path: "/profile",
    component: React.lazy(() => import("views/account/AccountView")),
    exact: true,
  },
  // users
  users: {
    path: "/users",
    component: React.lazy(() => import("views/customer/CustomerListView")),
    exact: true,
  },
  "users/add": {
    path: "/users/add",
    component: React.lazy(() => import("views/customer/AddUser")),
    exact: true,
  },
  "users/edit": {
    path: "/users/edit",
    component: React.lazy(() => import("views/customer/EditUser")),
    exact: true,
  },
  // categories
  categories: {
    path: "/categories",
    component: React.lazy(() => import("views/category/CategoryListView")),
    exact: true,
  },
  "categories/add": {
    path: "/categories/add",
    component: React.lazy(() => import("views/category/AddCategory")),
    exact: true,
  },
  "categories/edit": {
    path: "/categories/edit",
    component: React.lazy(() => import("views/category/EditCategory")),
    exact: true,
  },
  // statuses
  statuses: {
    path: "/statuses",
    component: React.lazy(() => import("views/status/StatusListView")),
    exact: true,
  },
  "statuses/add": {
    path: "/statuses/add",
    component: React.lazy(() => import("views/status/AddStatus")),
    exact: true,
  },
  "statuses/edit": {
    path: "/statuses/edit",
    component: React.lazy(() => import("views/status/EditStatus")),
    exact: true,
  },
  // products
  products: {
    path: "/products",
    component: React.lazy(() => import("views/product/ProductListView")),
    exact: true,
  },
  "products/add": {
    path: "/products/add",
    component: React.lazy(() => import("views/product/AddProduct")),
    exact: true,
  },
  "products/edit": {
    path: "/products/edit",
    component: React.lazy(() => import("views/product/EditProduct")),
    exact: true,
  },
  // orders
  orders: {
    path: "/orders",
    component: React.lazy(() => import("views/order/OrderListView")),
    exact: true,
  },
  "orders/view": {
    path: "/orders/view",
    component: React.lazy(() => import("views/order/OrderDetail")),
    exact: true,
  },
  // reviews
  reviews: {
    path: "/reviews",
    component: React.lazy(() => import("views/review/ReviewListView")),
    exact: true,
  },
  settings: {
    path: "/settings",
    component: React.lazy(() => import("views/settings/SettingsView")),
    exact: true,
  },
  "not-found": {
    path: "/404",
    component: React.lazy(() => import("views/errors/NotFoundView")),
    exact: true,
  },
  // "*": {
  //   path: "/*",
  //   component: <Redirect to="/404" />,
  //   exact: true,
  // },
};

export default routes;
