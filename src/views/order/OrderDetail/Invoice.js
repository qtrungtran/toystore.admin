import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import qs from "qs";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import calTotal from "utils/calTotal";
import formatDate from "utils/formatDate";
import routes from "app/app.routes";
import orderAPI from "api/order";

const useStyles = makeStyles(() => ({
  root: {},
  table: {
    minWidth: 650,
  },
  info: {
    display: "flex",
  },
  "text-gray": {
    fontSize: 14,
    color: "rgba(0, 0, 0, 0.54)",
  },
  invoice: {
    marginBottom: 24,
  },
  customer: {
    flexBasis: "50%",
  },
  owner: {
    flexBasis: "50%",
    backgroundColor: "#122230",
    color: "white",
    display: "flex",
    alignItems: "center",
    borderRadius: 8,
  },
  "owner-info": {
    borderLeft: "1px solid white",
  },
  avatar: {
    width: 80,
    height: 80,
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Invoice = ({ className, order, ...rest }) => {
  const classes = useStyles();

  return (
    <Box>
      <Box mb={3}>
        <Typography className={classes["text-gray"]}>
          {formatDate(order.createdAt)}
        </Typography>
        <Box className={classes.info} mt={3}>
          <Box className={classes.customer}>
            <Typography className={classes.invoice}>
              HÓA ĐƠN: {order.id}
            </Typography>
            <Box className={classes["text-gray"]}>
              <Typography>{order.user.username}</Typography>
              <Typography>
                {order.deliveryAddress}, {order.district}, {order.province}
              </Typography>
              <Typography>{order.deliveryPhoneNumber}</Typography>
              <Typography>{order.user.email}</Typography>
            </Box>
          </Box>
          <Box className={classes.owner} px={3}>
            <Avatar
              className={classes.avatar}
              src={order.orderDetails[0].product.user.avatar}
            />
            <Box ml={3} px={3} className={classes["owner-info"]}>
              <Typography>
                {order.orderDetails[0].product.user.username}
              </Typography>
              <Typography>
                {order.orderDetails[0].product.user.address},{" "}
                {order.orderDetails[0].product.user.district},{" "}
                {order.orderDetails[0].product.user.province}
              </Typography>
              <Typography>
                {order.orderDetails[0].product.user.phoneNumber}
              </Typography>
              <Typography>
                {order.orderDetails[0].product.user.email}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sản phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell align="right">Tổng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {order.orderDetails.map((detail) => (
              <TableRow key={detail.id}>
                <TableCell>{detail.product.name}</TableCell>
                <TableCell>${detail.price}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
                <TableCell align="right">
                  ${detail.price * detail.quantity}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.total} my={3} px={2}>
        <Typography variant="h5">Tổng tiền hàng</Typography>
        <Typography variant="h5">${calTotal(order.orderDetails)}</Typography>
      </Box>
      <Box className={classes.total} my={3} px={2}>
        <Typography variant="h5">Phí vận chuyển</Typography>
        <Typography variant="h5">${order.transportation.cost}</Typography>
      </Box>
      <Box className={classes.total} my={3} px={2}>
        <Typography variant="h3">TỔNG</Typography>
        <Typography variant="h3">
          ${calTotal(order.orderDetails) + order.transportation.cost}
        </Typography>
      </Box>
      {/* <Typography className={classes["text-gray"]}>
        Please pay within 15 days. Thank you for your business.
      </Typography> */}
    </Box>
  );
};

Invoice.propTypes = {
  className: PropTypes.string,
};

export default Invoice;
