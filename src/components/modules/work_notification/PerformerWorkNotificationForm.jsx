import React from "react";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Link,
  Checkbox,
} from "@material-ui/core";
import RadioGroupInput from "components/inputs/RadioGroupInput";
import TextInput from "components/inputs/TextInput";
import DateInput from "components/inputs/DateInput";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Link as RouterLink } from "react-router-dom";

const initialValues = {
  personalDetails: {
    memberNumber: "121312",
    title: "mr",
    identificationType: "rsa_id",
    rsa_id_number: "12312334",
    firstName: "John",
    lastName: "Thomad",
    nationality: "Viet Nam",
    countryOfBirth: "Viet Nam",
    IPNNumber: "14255"
  },
  recordingData: {
    recordingType: "",
    stageName: "",
    albumNumber: "",
    numberOfTracks: "",
    yearOfRelease: null,
    rolePlayed: ""
  },
  trackData: {
    trackNumber: "",
    title: "",
    trackISRCCode: "",
    duration: "",
    featuredPerformers: {
      firstName: "",
      lastName: ""
    },
    otherFeaturedPerformers: {
      firstName: "",
      lastName: ""
    },
    nonFeaturedPerformers: {
      firstName: "",
      lastName: ""
    }
  },
  reasonsForDeclining: "",
  policy: false
};

const InnerForm = ({ values, handleChange, setValues, setFieldValue, ...rest }) => {
  const { personalDetails } = values;

  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form>
          <Box mb={2}>
            <Typography color="textPrimary" variant="h1">
              Performer Work Notification
            </Typography>
          </Box>
          {/* Performer Details */}
          <Box>
            <Typography color="textPrimary" variant="h4">
              Personal Details
            </Typography>
          </Box>
          <List component="div" disablePadding>
            <ListItem>
              <ListItemText primary="Member Number" secondary={personalDetails.memberNumber} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Title (Mr, Ms, Mrs)"
                secondary={personalDetails.title === "mr"
                  ? "Mr"
                  : personalDetails.title === "ms" ? "Ms" : "Mrs"
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="First Name" secondary={personalDetails.firstName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Last Name" secondary={personalDetails.lastName} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Country of Birth" secondary={personalDetails.countryOfBirth} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Nationality" secondary={personalDetails.nationality} />
            </ListItem>
            <ListItem>
              <ListItemText primary={personalDetails.identificationType === "rsa_id" ? "RSA ID" : "Passport"} secondary={personalDetails.rsa_id_number} />
            </ListItem>
            <ListItem>
              <ListItemText primary="IPN Number" secondary={personalDetails.IPNNumber} />
            </ListItem>
          </List>
          {/* Recording Data */}
          <Box>
            <Typography color="textPrimary" variant="h4">
              Recording Data
            </Typography>   
            <Box mt={2} />
            <Field
              name="recordingData.recordingType"
              label="Recording Type"
              options={[
                {
                  key: "album_title",
                  label: "Album Title"
                },
                {
                  key: "single_title",
                  label: "Single Title"
                }
              ]}
              component={RadioGroupInput}
            />
            <Field
              name="recordingData.stageName"
              component={TextInput}
              label="Stage Name"
              fullWidth
            />
            <Field
              name="recordingData.albumNumber"
              component={TextInput}
              label="Album Number"
              fullWidth
            />
            <Field
              name="recordingData.numberOfTracks"
              label="Number of Tracks"
              component={TextInput}
              fullWidth
            />
            <Field
              name="recordingData.yearOfRelease"
              label="Year of Release"
              component={DateInput}
              fullWidth
            />
            <Box mt={2} />
            <Field
              name="recordingData.rolePlayed"
              label="Role(s) Played on the Recording"
              options={[
                {
                  key: "featured_performer",
                  label: "Featured Performer (Main Artist / Member of Ensemble)"
                },
                {
                  key: "other_featured_performer",
                  label: "Other Featured Performer (Member of Ensemble)"
                },
                {
                  key: "non_featured_performer",
                  label:
                    "Non-Featured Performer (Guitar, piano, drums, vocals etc.)"
                }
              ]}
              component={RadioGroupInput}
            />
          </Box>
          {/* Track Data */}
          <Box mt={3}>
            <Typography color="textPrimary" variant="h4">
              Track Data
            </Typography>
            <Field
              name="trackData.trackNumber"
              component={TextInput}
              label="Track Number"
              fullWidth
            />
            <Field
              name="trackData.title"
              component={TextInput}
              label="Title"
              fullWidth
            />
            <Field
              name="trackData.trackISRCCode"
              component={TextInput}
              label="Track ISRC Code"
              fullWidth
            />
            <Field
              name="trackData.duration"
              component={TextInput}
              label="Duration"
              fullWidth
            />
            <Box mt={2}>
              <Typography color="textPrimary" variant="h5">
                Featured Performer(s)
              </Typography>
              <Box ml={2}>
                <Field
                    name="trackData.featuredPerformers.firstName"
                    component={TextInput}
                    label="First Name"
                    fullWidth
                />
                <Field
                    name="trackData.featuredPerformers.lastName"
                    component={TextInput}
                    label="Last Name"
                    fullWidth
                />
              </Box>
            </Box>
            <Box mt={2}>
              <Typography color="textPrimary" variant="h5">
                Other Featured Performer(s)
              </Typography>
              <Box ml={2}>
                <Field
                    name="trackData.otherFeaturedPerformers.firstName"
                    component={TextInput}
                    label="First Name"
                    fullWidth
                />
                <Field
                    name="trackData.otherFeaturedPerformers.lastName"
                    component={TextInput}
                    label="Last Name"
                    fullWidth
                />
              </Box>
            </Box>
            <Box mt={2}>
              <Typography color="textPrimary" variant="h5">
                Non-Featured Performer(s)
              </Typography>
              <Box ml={2}>
                <Field
                    name="trackData.nonFeaturedPerformers.firstName"
                    component={TextInput}
                    label="First Name"
                    fullWidth
                />
                <Field
                    name="trackData.nonFeaturedPerformers.lastName"
                    component={TextInput}
                    label="Last Name"
                    fullWidth
                />
              </Box>
            </Box>
          </Box>
          {/* Terms & Conditions */}
          <Box mt={3}>
            <Box alignItems="center" display="flex" ml={-1}>
              <Checkbox
                checked={values.policy}
                name="policy"
                onChange={handleChange}
              />
              <Typography color="textSecondary" variant="body1">
                I have read the{" "}
                <Link
                  color="primary"
                  component={RouterLink}
                  to="#"
                  underline="always"
                  variant="h6"
                >
                  Terms and Conditions
                </Link>
              </Typography>
            </Box>
          </Box>
          <Box my={3}>
            <Button color="primary" size="large" fullWidth variant="contained">
              Submit
            </Button>
          </Box>
        </Form>
      </MuiPickersUtilsProvider>
    </Container>
  );
};

const PerformerWorkNotificationForm = () => {
  return <Formik initialValues={initialValues} component={InnerForm} />;
};

export default PerformerWorkNotificationForm;
