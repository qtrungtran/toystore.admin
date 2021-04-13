import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
} from "@material-ui/core";
import useNotification from "utils/hooks/notification";
import TextInput from "components/inputs/TextInput";
import SelectInput from "components/inputs/SelectInput";
import productAPI from "api/product";
import categoryAPI from "api/category";
import routes from "app/app.routes";

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    backgroundColor: "#122230",
    "&:hover": {
      backgroundColor: "#122230ed",
    },
  },
}));

const ProductDetails = ({ className, product, id, ...rest }) => {
  const { showError, showSuccess } = useNotification();
  const classes = useStyles();
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAll();
        setCategories(response.data.categories);
      } catch (error) {
        console.log("Failed to fetch category: ", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        ...product,
      }}
      validationSchema={Yup.object().shape({
        categoryId: Yup.number().required("Category is required"),
        name: Yup.string().required("Name is required"),
        quantity: Yup.number().required("Quantity is required"),
        price: Yup.number().required("Price is required"),
      })}
      onSubmit={async (
        { categoryId, name, description, quantity, price },
        { setSubmitting }
      ) => {
        console.log("submit");
        try {
          const response = await productAPI.edit(
            { categoryId, name, description, quantity, price },
            id
          );
          showSuccess("Edited successfully.");
          history.push(routes.products.path);
        } catch (error) {
          console.log("Failed to edit product: ", error);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Card>
            <CardHeader title="Thông tin sản phẩm" />
            <Divider />
            <CardContent>
              <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                  <Field
                    label="Tên sản phẩm"
                    margin="normal"
                    name="name"
                    component={TextInput}
                    fullWidth
                    variant="outlined"
                    size="small"
                    disabled
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    name="categoryId"
                    options={categories.map((category) => {
                      return {
                        key: category.id,
                        label: category.name,
                      };
                    })}
                    component={SelectInput}
                    fullWidth
                    label="Danh mục"
                    disabled
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    label="Số lượng"
                    margin="normal"
                    name="quantity"
                    component={TextInput}
                    fullWidth
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    label="Giá"
                    margin="normal"
                    name="price"
                    component={TextInput}
                    fullWidth
                    type="number"
                    variant="outlined"
                    size="small"
                    disabled
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    label="Mô tả"
                    margin="normal"
                    name="description"
                    component={TextInput}
                    fullWidth
                    multiline
                    rows={5}
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <Field
                    label="Chủ sản phẩm"
                    margin="normal"
                    name="owner"
                    component={TextInput}
                    fullWidth
                    variant="outlined"
                    size="small"
                    disabled
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            {/* <Box display="flex" justifyContent="flex-end" p={2}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                className={classes.button}
              >
                Save details
              </Button>
            </Box> */}
          </Card>
        </Form>
      )}
    </Formik>
  );
};

ProductDetails.propTypes = {
  className: PropTypes.string,
};

export default ProductDetails;
