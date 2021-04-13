import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { Container, Grid, makeStyles, Button } from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import Product from "./Product";
import TotalOrders from "./TotalOrders";
import TotalUsers from "./TotalUsers";
import TotalCompletedOrders from "./TotalCompletedOrders";
import userAPI from "api/user";
import productAPI from "api/product";
import orderAPI from "api/order";
import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import RevenueStatistics from "./RevenueStatistics";
import { CloudDownload as Download } from "@material-ui/icons";
import statisticsAPI from "api/statistics";

const { RangePicker } = DatePicker;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  button: {
    // marginBottom: theme.spacing(3),
    float: "right",
    textTransform: "none",
    backgroundColor: "#43a047",
    color: "white",
    padding: "4px 12px",
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: 8,
    },
    "&:hover": {
      color: "white",
      backgroundColor: "darkgray",
    },
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [statistics, setStatistics] = useState({});
  const [rangeDate, setRangeDate] = useState([]);

  const fetchData = async () => {
    try {
      const response = await statisticsAPI.getAll();
      setStatistics(response.data);
    } catch (error) {
      console.log("Failed to fetch data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log({ rangeDate });

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <Product totalProduct={statistics.products} />
          </Grid>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <TotalUsers totalUsers={statistics.users} />
          </Grid>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <TotalOrders totalOrders={statistics.orders} />
          </Grid>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <TotalCompletedOrders
              totalCompleledOrders={statistics.completedOrders}
            />
          </Grid>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <RangePicker
              onChange={(dates) => {
                console.log({ dates });
                const arrDate = dates.map((date) => {
                  const dd = ("0" + date._d.getDate()).slice(-2);
                  const mm = ("0" + (date._d.getMonth() + 1)).slice(-2);
                  const yyyy = date._d.getFullYear();
                  return `${yyyy}-${mm}-${dd}`;
                });
                // const arrDate = dates.map((date) => date._d.getTime());
                setRangeDate(arrDate);
              }}
            />
          </Grid>
          <Grid item lg={6} sm={6} xl={3} xs={12}>
            <a
              href={`http://localhost:3000/statistics/export?startDate=${rangeDate[0]}&endDate=${rangeDate[1]}`}
              className={classes.button}
            >
              <Download />
              Xuất Excel
            </a>
          </Grid>
          <Grid item xs={12}>
            <RevenueStatistics rangeDate={rangeDate} />
          </Grid>
          {/* <Grid item lg={8} md={12} xl={9} xs={12}>
            <Sales />
          </Grid> */}
          {/* <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(Dashboard);
