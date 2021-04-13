import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  image: {
    width: "100%",
  },
}));

const ProductCarousel = ({ images }) => {
  return (
    <Carousel next={() => {}} prev={() => {}}>
      {images.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
};

const Item = ({ item }) => {
  const classes = useStyles();
  return (
    <Paper>
      <img alt="" src={item.path} className={classes.image} />
    </Paper>
  );
};

export default ProductCarousel;
