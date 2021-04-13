import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { get } from "lodash";
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import RadioGroupInput from "components/inputs/RadioGroupInput";
import TextInput from "components/inputs/TextInput";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
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
    recording_type: "album_title",
    album_title: "album_title",
    single_title: "",
    stage_name: "stage_name",
    album_number: "A123",
    number_of_tracks: "5",
    first_fixation_record_company_name: "record_company_name",
    first_fixation_record_company_nationality: "record_company_nationality",
    original_record_company_country: "original_record_company_country",
    recording_year: "2020",
    first_fixation_country: "first_fixation_country",
    first_fixation_year: "2020",
    first_publication_country: "first_publication_country",
    first_publication_year: "2020",
    start_date_current_owner: "01/01/2002",
    previous_copyright_owner: "previous_copyright_owner",
    start_date_previous_owner: "01/01/2002",
    end_date_previous_owner: "01/01/2002",
  },
  trackData: {
    track_number: "A123",
    title: "title",
    track_isrc_code: "A123",
    duration: "duration",
    current_copyright_ownership: {
      record_company: "record_company",
      percentage_held: "100",
    },
    stage_name: "stage_name",
    featured_performers: {
      first_name: "first_name",
      last_name: "last_name",
    },
    other_featured_performers: {
      first_name: "first_name",
      last_name: "last_name",
    },
    non_featured_performers: {
      first_name: "first_name",
      last_name: "last_name",
    },
  },
  noteActions: "",
  notes: "",
};

const InnerForm = ({ isSubmitting, values }) => {
  const { copyrightOwnerDetails, recordingData, trackData } = values;

  const [openCopyrightOwnerDetails, setOpenCopyrightOwnerDetails] = useState(
    false
  );
  const [openRecordingData, setOpenRecordingData] = useState(false);
  const [openTrackData, setOpenTrackData] = useState(false);

  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h1">
              Review Copyright Owner Work Notification
            </Typography>
          </Box>
          <List component="nav">
            {/* Copyright Owner Details */}
            <ListItem
              button
              onClick={() =>
                setOpenCopyrightOwnerDetails(!openCopyrightOwnerDetails)
              }
            >
              <ListItemText>
                <Typography color="textPrimary" variant="h4">
                  Copyright Owner Details
                </Typography>
              </ListItemText>
              {openCopyrightOwnerDetails ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openCopyrightOwnerDetails}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
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
            </Collapse>

            {/* Recording Data */}
            <ListItem
              button
              onClick={() => setOpenRecordingData(!openRecordingData)}
            >
              <ListItemText>
                <Typography color="textPrimary" variant="h4">
                  Recording Data
                </Typography>
              </ListItemText>
              {openRecordingData ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openRecordingData} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {get(values, `recordingData.recording_type`) ===
                  "album_title" && (
                  <ListItem>
                    <ListItemText
                      primary="Album Title"
                      secondary={recordingData.album_title}
                    />
                  </ListItem>
                )}
                {get(values, `recordingData.recording_type`) ===
                  "single_title" && (
                  <ListItem>
                    <ListItemText
                      primary="Single Title"
                      secondary={recordingData.single_title}
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText
                    primary="Stage Name"
                    secondary={recordingData.stage_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Album Number"
                    secondary={recordingData.album_number}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Number of Tracks"
                    secondary={recordingData.number_of_tracks}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Name of Record Company of First Fixation"
                    secondary={recordingData.first_fixation_record_company_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Nationality of the Record Company of First Fixation"
                    secondary={
                      recordingData.first_fixation_record_company_nationality
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Country of Residence of Original Record Company"
                    secondary={recordingData.original_record_company_country}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Year of Recording"
                    secondary={recordingData.recording_year}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Country of First Fixation"
                    secondary={recordingData.first_fixation_country}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Year of First Fixation"
                    secondary={recordingData.first_fixation_year}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Country of First Publication"
                    secondary={recordingData.first_publication_country}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Year of First Publication"
                    secondary={recordingData.first_publication_year}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Start Date of the Current Owner of Sound Recording"
                    secondary={recordingData.start_date_current_owner}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Previous Copyright Owner(s) of the Sound Recording"
                    secondary={recordingData.previous_copyright_owner}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Start Date of Ownership by Previous Owner(s) of Copyright"
                    secondary={recordingData.start_date_previous_owner}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="End Date of Ownership by Previous Owner of Copyright"
                    secondary={recordingData.end_date_previous_owner}
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Track Data */}
            <ListItem button onClick={() => setOpenTrackData(!openTrackData)}>
              <ListItemText>
                <Typography color="textPrimary" variant="h4">
                  Track Data
                </Typography>
              </ListItemText>
              {openTrackData ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openTrackData} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Track Number"
                    secondary={trackData.track_number}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Title" secondary={trackData.title} />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Track ISRC Code"
                    secondary={trackData.track_isrc_code}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Duration"
                    secondary={trackData.duration}
                  />
                </ListItem>
                <ListItem
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Typography>Current Copyright Ownership</Typography>
                  <Box mx={2}>
                    <ListItemText
                      primary="Record Company"
                      secondary={
                        trackData.current_copyright_ownership.record_company
                      }
                    />
                    <ListItemText
                      primary="Percentage Held"
                      secondary={
                        trackData.current_copyright_ownership.percentage_held
                      }
                    />
                  </Box>
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Stage Name"
                    secondary={trackData.stage_name}
                  />
                </ListItem>
                <ListItem
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Typography>Featured Performer(s)</Typography>
                  <Box mx={2}>
                    <ListItemText
                      primary="First Name"
                      secondary={trackData.featured_performers.first_name}
                    />
                    <ListItemText
                      primary="Last Name"
                      secondary={trackData.featured_performers.last_name}
                    />
                  </Box>
                </ListItem>
                <ListItem
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Typography>Non-Featured Performer(s)</Typography>
                  <Box mx={2}>
                    <ListItemText
                      primary="First Name"
                      secondary={trackData.non_featured_performers.first_name}
                    />
                    <ListItemText
                      primary="Last Name"
                      secondary={trackData.non_featured_performers.last_name}
                    />
                  </Box>
                </ListItem>
                <ListItem
                  style={{ flexDirection: "column", alignItems: "flex-start" }}
                >
                  <Typography>Other Featured Performer(s)</Typography>
                  <Box mx={2}>
                    <ListItemText
                      primary="First Name"
                      secondary={trackData.other_featured_performers.first_name}
                    />
                    <ListItemText
                      primary="Last Name"
                      secondary={trackData.other_featured_performers.last_name}
                    />
                  </Box>
                </ListItem>
              </List>
            </Collapse>
          </List>

          {/* Actions */}
          <Box mx={2}>
            <Typography color="textPrimary" variant="h4">
              Notes
            </Typography>
            <Field
              name="noteActions"
              options={[
                {
                  key: "reject",
                  label: "Reject",
                },
                {
                  key: "accept",
                  label: "Accept",
                },
              ]}
              component={RadioGroupInput}
            />
            <Field
              name="notes"
              component={TextInput}
              label="Enter notes"
              fullWidth
            />
          </Box>
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
        </Form>
      </MuiPickersUtilsProvider>
    </Container>
  );
};

const ReviewCopyrightOwnerWorkNotificationForm = () => {
  return <Formik initialValues={initialValues} component={InnerForm} />;
};

export default ReviewCopyrightOwnerWorkNotificationForm;
