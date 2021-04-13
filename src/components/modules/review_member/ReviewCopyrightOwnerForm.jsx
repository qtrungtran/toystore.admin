import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { get } from "lodash";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Collapse,
  Card,
  CardHeader,
  CardMedia,
} from "@material-ui/core";
import RadioGroupInput from "components/inputs/RadioGroupInput";
import TextInput from "components/inputs/TextInput";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 520,
    marginBottom: 16,
    marginTop: 16,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const initialValues = {
  companyDetails: {
    registration_number: "A123",
    registration_docs_proof: "https://via.placeholder.com/520",
    company_name: "company_name",
    trading_name: "trading_name",
    record_company: "record_company",
    label_company: "label_company",
    vat_number: "123",
    income_tax_number: "123",
  },
  contactDetails: {
    email: "test@test.com",
    telephone_office: "123",
  },
  physicalAddressDetails: {
    street: "street",
    township_suburb_city_town: "suburb_name",
    province: "province_name",
    postal_code: "123",
    country: "country_name",
  },
  postalAddressDetails: {
    address_line_1: "address 1",
    address_line_2: "address 2",
    province: "province_name",
    postal_code: "123",
    country: "country_name",
  },
  contactPersonDetails: {
    first_name: "first_name",
    last_name: "last_name",
    email: "test@test.com",
    telephone_mobile: "123",
    telephone_work: "456",
  },
  directorDetails: {
    title: "ms",
    first_name: "first_name",
    last_name: "last_name",
    birth_country: "birth_country",
    nationality: "nationality",
    identificationType: "passport",
    id_number: "",
    passport_number: "123",
    id_proof: "https://via.placeholder.com/520",
    dob: "11/10/1990",
    passport_expiry: "01/01/2022",
    gender: "female",
    email: "test@test.com",
    telephone_mobile: "789",
  },
  bankingDetails: {
    account_holder: "account_holder",
    bank_name: "bank_name",
    branch_code: "123",
    account_type: "account_type",
    account_number: "123456",
    account_proof: "https://via.placeholder.com/520",
    account_proof_consent: "https://via.placeholder.com/520",
  },
  noteActions: "",
  notes: "",
};

const InnerForm = ({ isSubmitting, values }) => {
  const classes = useStyles();

  const {
    companyDetails,
    contactDetails,
    physicalAddressDetails,
    postalAddressDetails,
    contactPersonDetails,
    directorDetails,
    bankingDetails,
  } = values;

  const [openCompanyDetails, setOpenCompanyDetails] = useState(false);
  const [openContactDetails, setOpenContactDetails] = useState(false);
  const [openPhysicalAddressDetails, setOpenPhysicalAddressDetails] = useState(
    false
  );
  const [openPostalAddressDetails, setOpenPostalAddressDetails] = useState(
    false
  );
  const [openContactPersonDetails, setOpenContactPersonDetails] = useState(
    false
  );
  const [openDirectorDetails, setOpenDirectorDetails] = useState(false);
  const [openBankingDetails, setOpenBankingDetails] = useState(false);

  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form>
          <Box mb={3}>
            <Typography color="textPrimary" variant="h1">
              Review Copyright Owner Details
            </Typography>
          </Box>
          <Box mx={2}>
            <Typography color="textPrimary" variant="h4">
              Supporting Documentation
            </Typography>
            <Card className={classes.root}>
              <CardHeader title="Registration Proof" />
              <CardMedia
                className={classes.media}
                image={companyDetails.registration_docs_proof}
              />
            </Card>
            <Card className={classes.root}>
              <CardHeader title="Identification Proof" />
              <CardMedia
                className={classes.media}
                image={directorDetails.id_proof}
              />
            </Card>
            <Card className={classes.root}>
              <CardHeader title="Account Proof" />
              <CardMedia
                className={classes.media}
                image={bankingDetails.account_proof}
              />
            </Card>
            <Card className={classes.root}>
              <CardHeader title="Account Proof Consent" />
              <CardMedia
                className={classes.media}
                image={bankingDetails.account_proof_consent}
              />
            </Card>
          </Box>
          <List component="nav">
            {/* Company Details */}
            <ListItem
              button
              onClick={() => setOpenCompanyDetails(!openCompanyDetails)}
            >
              <ListItemText>
                <Typography color="textPrimary" variant="h4">
                  Company Details
                </Typography>
              </ListItemText>
              {openCompanyDetails ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openCompanyDetails} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Company Registration Number"
                    secondary={companyDetails.registration_number}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Company Name"
                    secondary={companyDetails.company_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Trading Name"
                    secondary={companyDetails.trading_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Record Company"
                    secondary={companyDetails.record_company}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Label Company"
                    secondary={companyDetails.label_company}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="VAT Number"
                    secondary={companyDetails.vat_number}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Income Tax Number"
                    secondary={companyDetails.income_tax_number}
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Contact Details */}
            <ListItem
              button
              onClick={() => setOpenContactDetails(!openContactDetails)}
            >
              <ListItemText>
                <Typography color="textPrimary" variant="h4">
                  Contact Details
                </Typography>
              </ListItemText>
              {openContactDetails ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openContactDetails} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Email Address"
                    secondary={contactDetails.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Telephone (Office)"
                    secondary={contactDetails.telephone_office}
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Physical Address Details */}
            <ListItem
              button
              onClick={() =>
                setOpenPhysicalAddressDetails(!openPhysicalAddressDetails)
              }
            >
              <ListItemText>
                <Typography color="textPrimary" variant="h4">
                  Physical Address Details
                </Typography>
              </ListItemText>
              {openPhysicalAddressDetails ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openPhysicalAddressDetails}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Street Number & Name"
                    secondary={physicalAddressDetails.street}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Township/Suburb/City/Town"
                    secondary={physicalAddressDetails.township_suburb_city_town}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Province"
                    secondary={physicalAddressDetails.province}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Postal Code"
                    secondary={physicalAddressDetails.postal_code}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Country"
                    secondary={physicalAddressDetails.country}
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Postal Address Details */}
            <ListItem
              button
              onClick={() =>
                setOpenPostalAddressDetails(!openPostalAddressDetails)
              }
            >
              <ListItemText>
                <Typography color="textPrimary" variant="h4">
                  Postal Address Details
                </Typography>
              </ListItemText>
              {openPostalAddressDetails ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openPostalAddressDetails}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Postal Address Line 1"
                    secondary={postalAddressDetails.address_line_1}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Postal Address Line 2"
                    secondary={postalAddressDetails.address_line_2}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Province"
                    secondary={postalAddressDetails.province}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Postal Code"
                    secondary={postalAddressDetails.postal_code}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Country"
                    secondary={postalAddressDetails.country}
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Contact Person Details */}
            <ListItem
              button
              onClick={() =>
                setOpenContactPersonDetails(!openContactPersonDetails)
              }
            >
              <ListItemText>
                <Typography color="textPrimary" variant="h4">
                  Contact Person Details
                </Typography>
              </ListItemText>
              {openContactPersonDetails ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={openContactPersonDetails}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText
                    primary="First Name"
                    secondary={contactPersonDetails.first_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last Name"
                    secondary={contactPersonDetails.last_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Email Address"
                    secondary={contactPersonDetails.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Telephone (Mobile)"
                    secondary={contactPersonDetails.telephone_mobile}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Telephone (Work)"
                    secondary={contactPersonDetails.telephone_work}
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Director Details */}
            <ListItem
              button
              onClick={() => setOpenDirectorDetails(!openDirectorDetails)}
            >
              <ListItemText>
                <Typography color="textPrimary" variant="h4">
                  Director Details
                </Typography>
              </ListItemText>
              {openDirectorDetails ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openDirectorDetails} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Title"
                    secondary={
                      directorDetails.title === "mr"
                        ? "Mr"
                        : directorDetails.title === "ms"
                        ? "Ms"
                        : "Mrs"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="First Name"
                    secondary={directorDetails.first_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Last Name"
                    secondary={directorDetails.last_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Country of Birth"
                    secondary={directorDetails.birth_country}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Nationality"
                    secondary={directorDetails.nationality}
                  />
                </ListItem>
                {get(values, `directorDetails.identificationType`) ===
                  "rsa_id" && (
                  <ListItem>
                    <ListItemText
                      primary="RSA ID Number"
                      secondary={directorDetails.id_number}
                    />
                  </ListItem>
                )}
                {get(values, `directorDetails.identificationType`) ===
                  "passport" && (
                  <ListItem>
                    <ListItemText
                      primary="Passport Number"
                      secondary={directorDetails.passport_number}
                    />
                  </ListItem>
                )}
                <ListItem>
                  <ListItemText
                    primary="Date of Birth"
                    secondary={directorDetails.dob}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Passport Expiry Date"
                    secondary={directorDetails.passport_expiry}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Gender"
                    secondary={
                      directorDetails.gender === "male" ? "Male" : "Female"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Email Address"
                    secondary={directorDetails.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Telephone (Mobile)"
                    secondary={directorDetails.telephone_mobile}
                  />
                </ListItem>
              </List>
            </Collapse>

            {/* Banking Details */}
            <ListItem
              button
              onClick={() => setOpenBankingDetails(!openBankingDetails)}
            >
              <ListItemText>
                <Typography color="textPrimary" variant="h4">
                  Banking Details
                </Typography>
              </ListItemText>
              {openBankingDetails ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={openBankingDetails} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Account Holder"
                    secondary={bankingDetails.account_holder}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Bank Name"
                    secondary={bankingDetails.bank_name}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Branch Code"
                    secondary={bankingDetails.branch_code}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Account Type"
                    secondary={bankingDetails.account_type}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Account Number"
                    secondary={bankingDetails.account_number}
                  />
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

const ReviewCopyrightOwnerForm = () => {
  return <Formik initialValues={initialValues} component={InnerForm} />;
};

export default ReviewCopyrightOwnerForm;
