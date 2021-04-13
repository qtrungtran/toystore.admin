import React from "react";
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
import { signin } from "state/modules/auth/authSlice";
import { useDispatch } from "react-redux";
import useNotification from "utils/hooks/notification";
import routes from "app/app.routes";
import statusAPI from 'api/status';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const AddStatus = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { showError, showSuccess } = useNotification();
  const history = useHistory();

  return (
    <Page className={classes.root} title="Add status">
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
              name: Yup.string()
                .max(255)
                .required("Name is required"),
            })}
            onSubmit={async ({ name }, { setSubmitting }) => {
              // dispatch(
              //   signin({
              //     username,
              //     password,
              //     onComplete: (error, data) => {
              //       setSubmitting(false);
              //       if (!error) {
              //         // handle login success
              //         history.push(routes["dashboard"].path);
              //         return;
              //       }
              //       const errorMessages = Object.values(error).join(". ");
              //       return showError(errorMessages);
              //     },
              //   })
							// );
							try {
                const response = await statusAPI.add({name});
                showSuccess("Added successfully.");
								history.push(routes.statuses.path);
							} catch (error) {
								console.log('Failed to add status: ', error);
							}
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Add status
                  </Typography>
                </Box>
                <Field
                  label="Name"
                  margin="normal"
                  name="name"
                  component={TextInput}
                  fullWidth
                />
						
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
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

export default compose(withLayout("dashboard"))(AddStatus);
