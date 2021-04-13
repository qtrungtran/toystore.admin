import React from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
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

const AddCategory = () => {
  const classes = useStyles();
  const { showError, showSuccess } = useNotification();
  const history = useHistory();

  return (
    <Page className={classes.root} title="Add category">
      <Box
        display="flex"
        flexDirection="column"
        // height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              name: "",
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().max(255).required("Name is required"),
            })}
            onSubmit={async ({ name }) => {
              try {
                const response = await categoryAPI.add({ name });
                showSuccess("Thêm danh mục thành công");
                history.push(routes.categories.path);
              } catch (error) {
                console.log("Failed to add category: ", error);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Thêm danh mục
                  </Typography>
                </Box>
                <Field
                  label="Tên danh mục"
                  margin="normal"
                  name="name"
                  component={TextInput}
                  fullWidth
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
                    Thêm
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

export default compose(withLayout("dashboard"))(AddCategory);
