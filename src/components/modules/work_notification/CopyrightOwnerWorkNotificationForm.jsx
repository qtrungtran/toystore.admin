import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { get } from "lodash";
import {
  Box,
  Container,
  Typography,
  Button,
  Checkbox,
  FormHelperText,
  Link,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import RadioGroupInput from "components/inputs/RadioGroupInput";
import TextInput from "components/inputs/TextInput";
import DateInput from "components/inputs/DateInput";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const initialValues = {
  copyrightOwnerDetails: {
    member_number: "A123",
    record_company: "record_company",
    label_company: "label_company",
    registration_number: "A123",
  },
  recordingData: {
    recording_type: "",
    album_title: "",
    single_title: "",
    stage_name: "",
    album_number: "",
    number_of_tracks: "",
    first_fixation_record_company_name: "",
    first_fixation_record_company_nationality: "",
    original_record_company_country: "",
    recording_year: "",
    first_fixation_country: "",
    first_fixation_year: "",
    first_publication_country: "",
    first_publication_year: "",
    start_date_current_owner: null,
    previous_copyright_owner: "",
    start_date_previous_owner: null,
    end_date_previous_owner: null,
  },
  trackData: {
    track_number: "",
    title: "",
    track_isrc_code: "",
    duration: "",
    current_copyright_ownership: {
      record_company: "",
      percentage_held: "",
    },
    stage_name: "",
    featured_performers: {
      first_name: "",
      last_name: "",
    },
    other_featured_performers: {
      first_name: "",
      last_name: "",
    },
    non_featured_performers: {
      first_name: "",
      last_name: "",
    },
  },
  policy: false,
};

const InnerForm = ({ errors, handleChange, isSubmitting, touched, values }) => {
  const { copyrightOwnerDetails } = values;
  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h1">
              Copyright Owner Work Notification
            </Typography>
          </Box>
          {/* Copyright Owner Details */}
          <Box>
            <Typography color="textPrimary" variant="h4">
              Copyright Owner Details
            </Typography>
            <List component="div">
              <ListItem>
                <ListItemText
                  primary="Member Number"
                  secondary={copyrightOwnerDetails.member_number}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Name of Record Company"
                  secondary={copyrightOwnerDetails.record_company}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Name of Record Label"
                  secondary={copyrightOwnerDetails.label_company}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Company Registration"
                  secondary={copyrightOwnerDetails.registration_number}
                />
              </ListItem>
            </List>
          </Box>

          {/* Recording Data */}
          <Box mb={3}>
            <Typography
              color="textPrimary"
              variant="h4"
              style={{ marginBottom: "1rem" }}
            >
              Recording Data
            </Typography>
            <Field
              name="recordingData.recording_type"
              label="Recording Type"
              options={[
                {
                  key: "album_title",
                  label: "Album Title",
                },
                {
                  key: "single_title",
                  label: "Single Title",
                },
              ]}
              component={RadioGroupInput}
            />
            {get(values, `recordingData.recording_type`) === "album_title" && (
              <Field
                name="recordingData.album_title"
                label="Album Title"
                component={TextInput}
                fullWidth
              />
            )}
            {get(values, `recordingData.recording_type`) === "single_title" && (
              <Field
                name="recordingData.single_title"
                label="Single Title"
                component={TextInput}
                fullWidth
              />
            )}
            <Field
              name="recordingData.stage_name"
              component={TextInput}
              label="Stage Name"
              fullWidth
            />
            <Field
              name="recordingData.album_number"
              component={TextInput}
              label="Album Number"
              fullWidth
            />
            <Field
              name="recordingData.number_of_tracks"
              component={TextInput}
              label="Number of Tracks"
              type="number"
              fullWidth
            />
            <Field
              name="recordingData.first_fixation_record_company_name"
              component={TextInput}
              label="Name of Record Company of First Fixation"
              fullWidth
            />
            <Field
              name="recordingData.first_fixation_record_company_nationality"
              component={TextInput}
              label="Nationality of the Record Company of First Fixation"
              fullWidth
            />
            <Field
              name="recordingData.original_record_company_country"
              component={TextInput}
              label="Country of Residence of Original Record Company"
              fullWidth
            />
            <Field
              name="recordingData.recording_year"
              component={TextInput}
              label="Year of Recording"
              fullWidth
            />
            <Field
              name="recordingData.first_fixation_country"
              component={TextInput}
              label="Country of First Fixation"
              fullWidth
            />
            <Field
              name="recordingData.first_fixation_year"
              component={TextInput}
              label="Year of First Fixation"
              fullWidth
            />
            <Field
              name="recordingData.first_publication_country"
              component={TextInput}
              label="Country of First Publication"
              fullWidth
            />
            <Field
              name="recordingData.first_publication_year"
              component={TextInput}
              label="Year of First Publication"
              fullWidth
            />
            <Field
              name="recordingData.start_date_current_owner"
              component={DateInput}
              label="Start Date of the Current Owner of Sound Recording"
              fullWidth
            />
            <Field
              name="recordingData.previous_copyright_owner"
              component={TextInput}
              label="Previous Copyright Owner(s) of the Sound Recording"
              fullWidth
            />
            <Field
              name="recordingData.start_date_previous_owner"
              component={DateInput}
              label="Start Date of Ownership by Previous Owner(s) of Copyright"
              fullWidth
            />
            <Field
              name="recordingData.end_date_previous_owner"
              component={DateInput}
              label="End Date of Ownership by Previous Owner of Copyright"
              fullWidth
            />
          </Box>

          {/* Track Data */}
          <Box mb={3}>
            <Typography color="textPrimary" variant="h4">
              Track Data
            </Typography>
            <Field
              name="trackData.track_number"
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
              name="trackData.track_isrc_code"
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
            <Box my={2}>
              <Typography color="textPrimary" variant="h5">
                Current Copyright Ownership
              </Typography>
              <Box mx={2}>
                <Field
                  name="trackData.current_copyright_ownership.record_company"
                  component={TextInput}
                  label="Record Company"
                  fullWidth
                />
                <Field
                  name="trackData.current_copyright_ownership.percentage_held"
                  component={TextInput}
                  label="Percentage Held"
                  type="number"
                  fullWidth
                />
              </Box>
            </Box>
            <Field
              name="trackData.stage_name"
              component={TextInput}
              label="Stage Name"
              fullWidth
            />
            <Box my={2}>
              <Typography color="textPrimary" variant="h5">
                Featured Performer(s)
              </Typography>
              <Box mx={2}>
                <Field
                  name="trackData.featured_performers.first_name"
                  component={TextInput}
                  label="Fisrt Name"
                  fullWidth
                />
                <Field
                  name="trackData.featured_performers.last_name"
                  component={TextInput}
                  label="Last Name"
                  fullWidth
                />
              </Box>
            </Box>
            <Box my={2}>
              <Typography color="textPrimary" variant="h5">
                Other Featured Performer(s)
              </Typography>
              <Box mx={2}>
                <Field
                  name="trackData.other_featured_performers.first_name"
                  component={TextInput}
                  label="Fisrt Name"
                  fullWidth
                />
                <Field
                  name="trackData.other_featured_performers.last_name"
                  component={TextInput}
                  label="Last Name"
                  fullWidth
                />
              </Box>
            </Box>
            <Box my={2}>
              <Typography color="textPrimary" variant="h5">
                Non-Featured Performer(s)
              </Typography>
              <Box mx={2}>
                <Field
                  name="trackData.non_featured_performers.first_name"
                  component={TextInput}
                  label="Fisrt Name"
                  fullWidth
                />
                <Field
                  name="trackData.non_featured_performers.last_name"
                  component={TextInput}
                  label="Last Name"
                  fullWidth
                />
              </Box>
            </Box>
          </Box>

          {/* Terms & Conditions - Button Submit */}
          <Box>
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
            {Boolean(touched.policy && errors.policy) && (
              <FormHelperText error>{errors.policy}</FormHelperText>
            )}
            <Box my={2}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Form>
      </MuiPickersUtilsProvider>
    </Container>
  );
};

const CopyrightOwnerWorkNotificationForm = () => {
  return <Formik initialValues={initialValues} component={InnerForm} />;
};

export default CopyrightOwnerWorkNotificationForm;
