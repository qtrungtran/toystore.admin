import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import qs from "qs";
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "components/Page";
import compose from "components/hocs/compose";
import withLayout from "components/hocs/withLayout";
import TextInput from "components/inputs/TextInput";
import { signin } from "state/modules/auth/authSlice";
import { useDispatch } from "react-redux";
import useNotification from "utils/hooks/notification";
import routes from "app/app.routes";
import categoryAPI from "api/category";

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

const EditCategory = () => {
  const classes = useStyles();
  const [category, setCategory] = useState({ name: "" });
  const dispatch = useDispatch();
  const { showError, showSuccess } = useNotification();
  const history = useHistory();
  const { search } = useLocation();
  const { id } = qs.parse(search.replace(/^\?/, ""));

  const fetchCategory = async (id) => {
    try {
      const response = await categoryAPI.get(id);
      const fetchedCategory = response.data.category;
      setCategory({
        name: fetchedCategory.name,
      });
    } catch (error) {
      console.log("Failed to fetch category: ", error);
    }
  };

  useEffect(() => {
    fetchCategory(id);
  }, []);

  return (
    <Page className={classes.root} title="Edit category">
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
              ...category,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required("Name is required"),
            })}
            onSubmit={async ({ name }) => {
              try {
                const response = await categoryAPI.edit({ name }, id);
                showSuccess("Lưu thành công");
                // history.push(routes.categories.path);
              } catch (error) {
                console.log("Failed to edit category: ", error);
              }
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Chỉnh sửa danh mục
                  </Typography>
                </Box>
                <Field
                  label="Tên danh mục"
                  margin="normal"
                  name="name"
                  component={TextInput}
                  fullWidth
                  // value={user.username}
                  variant="outlined"
                  size="small"
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
                    Lưu
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

export default compose(withLayout("dashboard"))(EditCategory);
