import React from "react";
// import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";
import RadioGroupInput from "components/inputs/RadioGroupInput";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextInput from "components/inputs/TextInput";

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
        recordingType: "album_title",
        stageName: "Lac Troi",
        albumNumber: "245",
        numberOfTracks: "124578",
        yearOfRelease: null,
        rolePlayed: "featured_performer"
    },
    trackData: {
        trackNumber: "145",
        title: "Lac Troi",
        trackISRCCode: "124777N",
        duration: "Viet Nam",
        featuredPerformers: {
            firstName: "Thomad",
            lastName: "William"
        },
        otherFeaturedPerformers: {
            firstName: "Chanel",
            lastName: "First"
        },
        nonFeaturedPerformers: {
            firstName: "Captain",
            lastName: "American"
        },
    },
    note: "",
    notes: "",
    reasonsForDeclining: "",
};

const InnerForm = ({ values, setValues, setFieldValue, ...rest }) => {
  const {
    personalDetails,
    recordingData,
    trackData,
  } = values;

  const [openPerformerDetails, setOpenPerformerDetails] = React.useState(false);
  const [openRecordingData, setOpenRecordingData] = React.useState(false);
  const [openTrackData, setOpenTrackData] = React.useState(false);
  
  const performerDetailsHandleClick = () => {
    setOpenPerformerDetails(!openPerformerDetails);
  };
  const recordingDataHandleClick = () => {
    setOpenRecordingData(!openRecordingData);
  };
  const trackDataHandleClick = () => {
    setOpenTrackData(!openTrackData);
  };

  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form>
          <Box mb={2}>
            <Typography color="textPrimary" variant="h1">
              Review Performer Work Notification
            </Typography>
          </Box>
          <List>
          {/* Personal Details */}
          <ListItem button onClick={performerDetailsHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
              Personal Details
            </Typography>
          </ListItemText>
            {openPerformerDetails ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPerformerDetails} timeout="auto" unmountOnExit>
            <Box ml={1}>
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
            </Box>
          </Collapse>
          {/* Recording Data */}
          <ListItem button onClick={recordingDataHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
                Recording Data
            </Typography>
          </ListItemText>
            {openRecordingData ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openRecordingData} timeout="auto" unmountOnExit>
            <Box ml={1}>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText primary="Recording Type" secondary={recordingData.recordingType === "album_title" ? "Album Title" : "Single Title"} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Stage Name" secondary={recordingData.stageName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Album Number" secondary={recordingData.albumNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Number of Tracks" secondary={recordingData.numberOfTracks} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Year of Release" secondary={recordingData.yearOfRelease} />
                </ListItem>
                <ListItem>
                  <ListItemText 
                    primary="Role(s) Played on the Recording" 
                    secondary={recordingData.rolePlayed === "featured_performer"
                        ? "Featured Performer (Main Artist / Member of Ensemble)"
                        : recordingData.rolePlayed === "other_featured_performer"
                            ? "Other Featured Performer (Member of Ensemble)"
                            : "Non-Featured Performer Session (Artist (guitar, piano, drums, vocals etc.)"
                    } />
                </ListItem>
              </List>
            </Box>
          </Collapse>
          {/* Track Data */}
          <ListItem button onClick={trackDataHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
              Track Data
            </Typography>
          </ListItemText>
            {openTrackData ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openTrackData} timeout="auto" unmountOnExit>
            <Box ml={1}>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText primary="Track Number" secondary={trackData.trackNumber} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Title" secondary={trackData.title} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Track ISRC Code" secondary={trackData.trackISRCCode} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Duration" secondary={trackData.duration} />
                </ListItem>
                <ListItem>
                  <Typography color="textPrimary" variant="h5">
                    Featured Performer(s)
                  </Typography>
                </ListItem>
                <Box ml={2}>
                  <ListItem>
                    <ListItemText primary="First Name" secondary={trackData.featuredPerformers.firstName} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Last Name" secondary={trackData.featuredPerformers.lastName} />
                  </ListItem>
                </Box>
                <ListItem>
                  <Typography color="textPrimary" variant="h5">
                    Other Featured Performer(s)
                  </Typography>
                </ListItem>
                <Box ml={2}>
                  <ListItem>
                    <ListItemText primary="First Name" secondary={trackData.otherFeaturedPerformers.firstName} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Last Name" secondary={trackData.otherFeaturedPerformers.lastName} />
                  </ListItem>
                </Box>
                <ListItem>
                  <Typography color="textPrimary" variant="h5">
                    Non-Featured Performer(s)
                  </Typography>
                </ListItem>
                <Box ml={2}>
                  <ListItem>
                    <ListItemText primary="First Name" secondary={trackData.nonFeaturedPerformers.firstName} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Last Name" secondary={trackData.nonFeaturedPerformers.lastName} />
                  </ListItem>
                </Box>
              </List>
            </Box>
          </Collapse>
          {/* Notes */}
          <Box mt={3}>
            <Typography color="textPrimary" variant="h4">
              Notes
            </Typography>
            <Field
              name="note"
              options={[
                {
                  key: "accepts",
                  label: "Accepts",
                },
                {
                  key: "rejects",
                  label: "Rejects",
                },
              ]}
              component={RadioGroupInput}
            />
            <Field
              name="notes"
              component={TextInput}
              fullWidth
              label="Notes"
            />
          </Box>
          <Box my={3}>
            <Button
              color="primary"
              size="large"
              fullWidth
              variant="contained"
            >
              Submit
            </Button>
          </Box>
          </List>
        </Form>
      </MuiPickersUtilsProvider>
    </Container>
  );
};

const ReviewPerformerWorkNotificationForm = () => {
  return <Formik initialValues={initialValues} component={InnerForm} />;
};

export default ReviewPerformerWorkNotificationForm;
