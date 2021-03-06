import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Container,
  Button,
} from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import OrderDetails from "./OrderDetails";
import Products from "./Products";
import Invoice from "./Invoice";
import orderAPI from "api/order";
import useNotification from "utils/hooks/notification";
import transactionAPI from "api/transaction";
import calTotal from "utils/calTotal";
import payoutAPI from "api/payout";
import orderHistoryAPI from "api/orderHistory";
import { set } from "js-cookie";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  tabPanel: {
    border: "1px solid #ddd",
    borderTop: "none",
  },
  tabs: {
    backgroundColor: "#fff",
  },
  tab: {
    textTransform: "capitalize",
  },
  "action-btn": {
    textTransform: "none !important",
    marginRight: "20px !important",
  },
}));

function OrderDetail() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const { showSuccess } = useNotification();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [order, setOrder] = useState({
    id: "",
    user: {},
    statusId: "",
    paymentMethod: "",
    deliveryPhoneNumber: "",
    deliveryAddress: "",
    district: "",
    province: "",
    createdAt: "",
    orderDetails: [],
    transportation: {},
    orderHistories: [],
  });

  const [isShow1, setIsShow1] = useState(true);
  const [isShow2, setIsShow2] = useState(false);
  const [isShow3, setIsShow3] = useState(false);
  const [isShow4, setIsShow4] = useState(true);
  const [isShow5, setIsShow5] = useState(false);

  const { search } = useLocation();
  const { id } = qs.parse(search.replace(/^\?/, ""));

  const fetchOrder = async (id) => {
    try {
      const response = await orderAPI.get(id);
      const fetchedOrder = response.data.order;
      setOrder({
        id: fetchedOrder.id,
        user: fetchedOrder.user,
        statusId: fetchedOrder.statusId,
        paymentMethod: fetchedOrder.paymentMethod,
        deliveryPhoneNumber: fetchedOrder.deliveryPhoneNumber,
        deliveryAddress: fetchedOrder.deliveryAddress,
        district: fetchedOrder.district,
        province: fetchedOrder.province,
        createdAt: fetchedOrder.createdAt,
        orderDetails: fetchedOrder.orderDetails,
        transportation: fetchedOrder.transportation,
        orderHistories: fetchedOrder.orderHistories,
      });
    } catch (error) {
      console.log("Failed to fetch order: ", error);
    }
  };

  const updateOrderStatus = async (statusId, orderId) => {
    try {
      await orderAPI.editStatus({ statusId: statusId }, orderId);
      // history.push("/orders");
      fetchOrder(id);
      showSuccess("???? c???p nh???t");
    } catch (error) {
      console.log("Failed to update status: ", error);
    }
  };

  const createOrderHistory = async (history) => {
    try {
      await orderHistoryAPI.add(history);
      fetchOrder(id);
    } catch (error) {
      console.log("Failed to create order history: ", error);
    }
  };

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  // const createTransaction = async (transaction) => {
  //   try {
  //     await transactionAPI.add(transaction);
  //     await payoutAPI.payout({ amount: transaction.amount });
  //   } catch (error) {
  //     console.log("Failed to create transaction: ", error);
  //   }
  // };
  const createTransaction = async (transaction) => {
    try {
      // const response = await payoutAPI.payout({ amount: transaction.amount });
      // console.log({ response });
      // transaction.payoutId = response.data;
      await transactionAPI.add(transaction);
    } catch (error) {
      console.log("Failed to create transaction: ", error);
    }
  };

  console.log(1);

  return (
    <Page className={classes.root} title="Orders">
      <Container maxWidth={false}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            className={classes.tabs}
          >
            <Tab
              label="Th??ng tin ????n h??ng"
              {...a11yProps(0)}
              className={classes.tab}
            />
            <Tab label="S???n ph???m" {...a11yProps(1)} className={classes.tab} />
            <Tab label="H??a ????n" {...a11yProps(2)} className={classes.tab} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0} className={classes.tabPanel}>
          <OrderDetails order={{ ...order }} />
        </TabPanel>
        <TabPanel value={value} index={1} className={classes.tabPanel}>
          <Products orderDetails={order.orderDetails} />
        </TabPanel>
        <TabPanel value={value} index={2} className={classes.tabPanel}>
          <Invoice order={{ ...order }} />
        </TabPanel>
        <Box mt={2}>
          {order.statusId === 2 && (
            <Button
              variant="contained"
              onClick={() => {
                updateOrderStatus(3, order.id);
                createOrderHistory({
                  orderId: order.id,
                  name: "???? l???y h??ng",
                });
              }}
              className={classes["action-btn"]}
            >
              X??c nh???n ???? l???y h??ng
            </Button>
          )}
          {order.statusId === 3 &&
            order.orderDetails[0].product.user.province !==
              order.user.province && (
              <>
                {isShow1 && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      createOrderHistory({
                        orderId: order.id,
                        name: `???? r???i kho ${order.orderDetails[0].product.user.province}`,
                      });
                      showSuccess("???? c???p nh???t");
                      setIsShow2(true);
                      setIsShow1(false);
                    }}
                    className={classes["action-btn"]}
                  >
                    ???? r???i kho {order.orderDetails[0].product.user.province}
                  </Button>
                )}
                {isShow2 && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      createOrderHistory({
                        orderId: order.id,
                        name: `???? ?????n kho ${order.user.province}`,
                      });
                      showSuccess("???? c???p nh???t");
                      setIsShow3(true);
                      setIsShow1(false);
                      setIsShow2(false);
                    }}
                    className={classes["action-btn"]}
                  >
                    ???? ?????n kho {order.user.province}
                  </Button>
                )}
                {isShow3 && (
                  <Button
                    variant="contained"
                    onClick={async () => {
                      if (order.paymentMethod === "Paypal") {
                        const response = await payoutAPI.payout({
                          amount: calTotal(order.orderDetails),
                        });
                        createTransaction({
                          userId: order.orderDetails[0].product.userId,
                          orderId: order.id,
                          payoutId: response.data,
                          amount: calTotal(order.orderDetails),
                          status: "??ang x??? l??",
                        });
                      }
                      updateOrderStatus(4, order.id);
                      createOrderHistory({
                        orderId: order.id,
                        name: "???? giao h??ng",
                      });
                    }}
                    className={classes["action-btn"]}
                  >
                    X??c nh???n ???? giao
                  </Button>
                )}
              </>
            )}
          {order.statusId === 3 &&
            order.orderDetails[0].product.user.province ===
              order.user.province && (
              <>
                {isShow4 && (
                  <Button
                    variant="contained"
                    onClick={() => {
                      createOrderHistory({
                        orderId: order.id,
                        name: `??ang giao trong n???i th??nh ${order.user.province}`,
                      });
                      showSuccess("???? c???p nh???t");
                      setIsShow5(true);
                      setIsShow4(false);
                    }}
                    className={classes["action-btn"]}
                  >
                    ??ang giao trong n???i th??nh
                  </Button>
                )}
                {isShow5 && (
                  <Button
                    variant="contained"
                    onClick={async () => {
                      if (order.paymentMethod === "Paypal") {
                        const response = await payoutAPI.payout({
                          amount: calTotal(order.orderDetails),
                        });
                        createTransaction({
                          userId: order.orderDetails[0].product.userId,
                          orderId: order.id,
                          payoutId: response.data,
                          amount: calTotal(order.orderDetails),
                          status: "??ang x??? l??",
                        });
                      }
                      updateOrderStatus(4, order.id);
                      createOrderHistory({
                        orderId: order.id,
                        name: "???? giao h??ng",
                      });
                    }}
                    className={classes["action-btn"]}
                  >
                    X??c nh???n ???? giao
                  </Button>
                )}
              </>
            )}
          {order.statusId === 11 && (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  updateOrderStatus(10, order.id);
                  createOrderHistory({
                    orderId: order.id,
                    name: "T??? ch???i tr??? h??ng",
                  });
                }}
                className={classes["action-btn"]}
              >
                T??? ch???i tr??? h??ng
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  updateOrderStatus(9, order.id);
                  createOrderHistory({
                    orderId: order.id,
                    name: "??ang tr??? h??ng",
                  });
                }}
                className={classes["action-btn"]}
              >
                ?????ng ?? tr??? h??ng
              </Button>
            </>
          )}
          {order.statusId === 9 && (
            <>
              <Button
                variant="contained"
                onClick={async () => {
                  if (order.paymentMethod === "Paypal") {
                    const response = await payoutAPI.payout({
                      amount:
                        calTotal(order.orderDetails) +
                        order.transportation.cost,
                    });
                    createTransaction({
                      userId: order.userId,
                      orderId: order.id,
                      payoutId: response.data,
                      amount:
                        calTotal(order.orderDetails) +
                        order.transportation.cost,
                      status: "??ang x??? l??",
                    });
                  }
                  updateOrderStatus(8, order.id);
                  createOrderHistory({
                    orderId: order.id,
                    name: "Tr??? h??ng th??nh c??ng",
                  });
                }}
                className={classes["action-btn"]}
              >
                ???? tr??? h??ng
              </Button>
            </>
          )}
        </Box>
      </Container>
    </Page>
  );
}

export default compose(withLayout("dashboard"))(OrderDetail);
