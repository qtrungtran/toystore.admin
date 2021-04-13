import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import qs from "qs";
import { Container, Grid, Button, makeStyles } from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import ProductCarousel from "./ProductCarousel";
import ProductDetails from "./ProductDetails";
import productAPI from "api/product";
import Reviews from "./Reviews";
import useNotification from "utils/hooks/notification";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    minHeight: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const Product = () => {
  const classes = useStyles();
  const { showSuccess } = useNotification();
  const history = useHistory();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    categoryId: 0,
    quantity: 0,
    price: 0,
    description: "",
    owner: "",
    images: [],
    status: "",
  });
  const { search } = useLocation();
  const { id } = qs.parse(search.replace(/^\?/, ""));

  useEffect(() => {
    fetchProduct(id);
  }, []);

  const fetchProduct = async (id) => {
    try {
      const response = await productAPI.get(id);
      const fetchedProduct = response.data.product;
      setProduct({
        id: fetchedProduct.id,
        name: fetchedProduct.name,
        categoryId: fetchedProduct.categoryId,
        quantity: fetchedProduct.quantity,
        price: fetchedProduct.price,
        description: fetchedProduct.description,
        owner: fetchedProduct.user.username,
        images: fetchedProduct.images,
        status: fetchedProduct.status,
      });
    } catch (error) {
      console.log("Failed to fetch product: ", error);
    }
  };

  const approveProduct = async (id) => {
    try {
      const response = await productAPI.editStatus({ status: true }, id);
      showSuccess("Đã duyệt sản phẩm");
      // history.push("/products");
    } catch (error) {
      console.log("Failed to fetch product: ", error);
    }
  };

  return (
    <Page className={classes.root} title="Product">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <ProductCarousel images={product.images} />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProductDetails product={{ ...product }} id={id} />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            {!product.status && (
              <Button
                variant="contained"
                onClick={() => approveProduct(product.id)}
              >
                Duyệt sản phẩm
              </Button>
            )}
          </Grid>
          <Grid item xs={12}>
            <Reviews productId={id} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(Product);
