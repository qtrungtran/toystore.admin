import React, { useState, useEffect } from "react";
import { Link as RouterLink, useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import qs from "qs";
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

const EditStatus = () => {
  const classes = useStyles();
  const [status, setStatus] = useState({name: ''});
  const dispatch = useDispatch();
  const { showError, showSuccess } = useNotification();
  const history = useHistory();
  const { search } = useLocation();
  const { id } = qs.parse(search.replace(/^\?/, ""));


  useEffect(() => {
    const fetchStatus = async (id) => {
        try {
            const response = await statusAPI.get(id);
            const fetchedStatus = response.data.status;
            setStatus({
              name: fetchedStatus.name,
            });
        } catch (error) {
            console.log('Failed to fetch status: ', error);
        }
    }
    console.log(id);
    fetchStatus(id);
  }, []);

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
            enableReinitialize={true}
            initialValues={{
              ...status
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
                const response = await statusAPI.edit({name}, id);
                showSuccess("Editted successfully.");
								history.push(routes.statuses.path);
							} catch (error) {
								console.log('Failed to edit status: ', error);
							}
            }}
          >
            {({ isSubmitting, values }) => (
              <Form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Edit Status
                  </Typography>
                </Box>
                <Field
                  label="Name"
                  margin="normal"
                  name="name"
                  component={TextInput}
                  fullWidth
                  // value={user.username}
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
                    Edit
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

export default compose(withLayout("dashboard"))(EditStatus);
