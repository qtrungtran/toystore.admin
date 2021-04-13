import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  table: {
    minWidth: 650,
  },
  image: {
    width: 48,
    height: 48,
  },
}));

const Products = ({ className, orderDetails, ...rest }) => {
  const classes = useStyles();

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Tên sản phẩm</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Số lượng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails.map((detail) => (
              <TableRow key={detail.id}>
                <TableCell>{detail.product.id}</TableCell>
                <TableCell>
                  {detail.product.images.length !== 0 && (
                    <img
                      alt=""
                      src={detail.product.images[0].path}
                      className={classes.image}
                    />
                  )}
                </TableCell>
                <TableCell>{detail.product.name}</TableCell>
                <TableCell>${detail.price}</TableCell>
                <TableCell>{detail.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

Products.propTypes = {
  className: PropTypes.string,
};

export default Products;
