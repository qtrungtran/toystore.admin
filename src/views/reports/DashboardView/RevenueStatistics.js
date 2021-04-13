import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@material-ui/core";
import formatDate from "utils/formatDate";
import calTotal from "utils/calTotal";
import orderAPI from "api/order";

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  revenue: {
    fontSize: 20,
    fontWeight: 700,
    display: "flex",
    justifyContent: "space-between",
    padding: "0 16px",
  },
});

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function totalPrice(items) {
  return items
    .map(({ orderDetails }) => calTotal(orderDetails))
    .reduce((sum, i) => sum + i, 0);
}

function totalShipCost(items) {
  return items
    .map(({ transportation }) => transportation.cost)
    .reduce((sum, i) => sum + i, 0);
}

const RevenueStatistics = ({ rangeDate }) => {
  const classes = useStyles();
  const [orders, setOrders] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [count, setCount] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchOrders();
  }, [page, rowsPerPage, rangeDate]);

  const fetchOrders = async () => {
    try {
      const params = {
        page: page + 1,
        limit: rowsPerPage,
        status: 4,
        status2: 10,
        startDate: rangeDate[0],
        endDate: rangeDate[1],
        // type: typeValue,
        // search: search
      };
      const response = await orderAPI.getPerPage({ params: params });
      const orders = await response.data.result.dataInPage;
      setOrders(orders);
      setRevenue(response.data.revenue);
      setRowsPerPage(params.limit);
      setCount(response.data.result.total);
    } catch (error) {
      console.log("Failed to fetch orders: ", error);
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={6}>
                Thông tin chi tiết
              </TableCell>
              <TableCell align="right">Doanh thu</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Chủ cửa hàng</TableCell>
              <TableCell>Khách hàng</TableCell>
              <TableCell>Ngày giao hàng</TableCell>
              <TableCell align="right">Tiền hàng</TableCell>
              <TableCell align="right">Phí vận chuyển</TableCell>
              <TableCell align="right">Tổng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {order.orderDetails[0]?.product.user.username}
                </TableCell>
                <TableCell>{order.user.username}</TableCell>
                <TableCell>{formatDate(order.updatedAt)}</TableCell>
                <TableCell align="right">
                  ${calTotal(order.orderDetails)}
                </TableCell>
                <TableCell align="right">
                  ${order.transportation.cost}
                </TableCell>
                <TableCell align="right">
                  ${calTotal(order.orderDetails) + order.transportation.cost}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <div className={classes.revenue}>
        <div>Tổng doanh thu</div>
        <div>${revenue}</div>
      </div>
    </>
  );
};

export default RevenueStatistics;
