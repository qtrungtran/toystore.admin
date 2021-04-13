import React, { useEffect, useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Container,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import TextInput from "components/inputs/TextInput";
import SelectInput from "components/inputs/SelectInput";
import { signin } from "state/modules/auth/authSlice";
import { useDispatch } from "react-redux";
import useNotification from "utils/hooks/notification";
import routes from "app/app.routes";
import productAPI from "api/product";
import categoryAPI from "api/category";
import imageAPI from "api/image";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
  button: {
    backgroundColor: "#122230",
    "&:hover": {
      backgroundColor: "#122230ed",
    },
  },
}));

const AddProduct = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useNotification();
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState(null);

  const onFileUpload = async (id) => {
    try {
      for (let i = 0; i < images.length; i++) {
        if (images[i] !== "") {
          let fileData = new FormData();
          fileData.set(
            "image",
            images[i],
            `${images[i].lastModified}-${images[i].name}`
          );
          await imageAPI.uploadProductImage(fileData, id);
          // showSuccess("Editted successfully.");
        }
      }
    } catch (error) {
      console.log("Failed to edit user: ", error);
    }

    console.log(images);
  };

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

  console.log("images", images);

  return (
    <Page className={classes.root} title="Add product">
      <Box
        display="flex"
        flexDirection="column"
        // height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            enableReinitialize={true}
            initialValues={{
              categoryId: categories.length !== 0 ? categories[0].id : 0,
              name: "",
              description: "",
              quantity: 0,
              price: 0,
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
              try {
                const response = await productAPI.add({
                  categoryId,
                  name,
                  description,
                  quantity,
                  price,
                });
                await onFileUpload(response.data.id);
                showSuccess("Added successfully.");
                history.push(routes.products.path);
              } catch (error) {
                console.log("Failed to add product: ", error);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Thêm sản phẩm
                  </Typography>
                </Box>
                <Field
                  label="Name"
                  margin="normal"
                  name="name"
                  component={TextInput}
                  fullWidth
                  variant="outlined"
                />
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
                  label="Category"
                  // variant="outlined"
                />
                <Field
                  label="Quantity"
                  margin="normal"
                  name="quantity"
                  component={TextInput}
                  fullWidth
                  type="number"
                  variant="outlined"
                />
                <Field
                  label="Price"
                  margin="normal"
                  name="price"
                  component={TextInput}
                  fullWidth
                  type="number"
                  variant="outlined"
                />
                <Field
                  label="Description"
                  margin="normal"
                  name="description"
                  component={TextInput}
                  fullWidth
                  multiline
                  rows={5}
                  variant="outlined"
                />
                <input
                  name="images"
                  type="file"
                  multiple
                  onChange={(e) => {
                    setImages(e.target.files);
                  }}
                />

                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    className={classes.button}
                  >
                    Add
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default compose(withLayout("dashboard"))(AddProduct);
