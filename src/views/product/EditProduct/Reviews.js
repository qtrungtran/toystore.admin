import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Grid,
  makeStyles,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import reviewAPI from "api/review";
import formatDate from "utils/formatDate";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    marginBottom: 24,
  },
  cardContent: {
    display: "flex",
  },
  avatar: {
    width: 48,
    height: 48,
    marginRight: 10,
  },
  content: {
    marginTop: 4,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
  username: {
    fontSize: 14,
  },
});

const Reviews = ({ productId }) => {
  const classes = useStyles();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetchReviewsByProduct(productId);
  }, []);

  const fetchReviewsByProduct = async (productId) => {
    try {
      // const params = {
      //   _page: 1,
      //   _limit: 10,
      // };
      const response = await reviewAPI.getByProduct(productId);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log("Failed to fetch reviews: ", error);
    }
  };
  return (
    <>
      <Typography variant="h5" component="h1" className={classes.title}>
        Đánh giá sản phẩm
      </Typography>
      <Grid container spacing={3}>
        {reviews.map((review, index) => (
          <Grid item lg={4} md={6} xs={12} key={index}>
            <Card>
              <CardContent className={classes.cardContent}>
                <Avatar className={classes.avatar} src={review.user.avatar} />
                <Box>
                  <Typography
                    className={classes.username}
                    color="textSecondary"
                    gutterBottom
                  >
                    {review.user.username}
                  </Typography>
                  <Rating name="read-only" value={review.star} readOnly />
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.content}
                  >
                    {review.content}
                  </Typography>
                  <Typography className={classes.date} color="textSecondary">
                    {formatDate(review.createdAt)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Reviews;
