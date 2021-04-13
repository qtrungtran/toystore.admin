import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { get } from "lodash";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Button,
  Checkbox,
  FormHelperText,
  Link,
  Card,
  CardMedia,
} from "@material-ui/core";
import RadioGroupInput from "components/inputs/RadioGroupInput";
import TextInput from "components/inputs/TextInput";
import DateInput from "components/inputs/DateInput";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 552,
    marginTop: 16,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const initialValues = {
  companyDetails: {
    registration_number: "",
    registration_docs_proof: "",
    company_name: "",
    trading_name: "",
    record_company: "",
    label_company: "",
    vat_number: "",
    income_tax_number: "",
  },
  contactDetails: {
    email: "",
    telephone_office: "",
  },
  physicalAddressDetails: {
    street: "",
    township_suburb_city_town: "",
    province: "",
    postal_code: "",
    country: "",
  },
  postalAddressDetails: {
    address_line_1: "",
    address_line_2: "",
    province: "",
    postal_code: "",
    country: "",
  },
  contactPersonDetails: {
    first_name: "",
    last_name: "",
    email: "",
    telephone_mobile: "",
    telephone_work: "",
  },
  directorDetails: {
    title: "",
    first_name: "",
    last_name: "",
    birth_country: "",
    nationality: "",
    identificationType: "",
    id_number: "",
    passport_number: "",
    id_proof: "",
    dob: null,
    passport_expiry: null,
    gender: "",
    email: "",
    telephone_mobile: "",
  },
  bankingDetails: {
    account_holder: "",
    bank_name: "",
    branch_code: "",
    account_type: "",
    account_number: "",
    account_proof: "",
    account_proof_consent: "",
  },
  policy: false,
};

const InnerForm = ({ errors, handleChange, isSubmitting, touched, values }) => {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form>
          {/* Company Details */}
          <Box mb={3}>
            <Typography color="textPrimary" variant="h4">
              Company Details
            </Typography>
            <Field
              name="companyDetails.registration_number"
              component={TextInput}
              label="Company Registration Number"
              fullWidth
            />
            <Field
              name="companyDetails.company_name"
              component={TextInput}
              label="Company Name"
              fullWidth
            />
            <Field
              name="companyDetails.trading_name"
              component={TextInput}
              label="Trading Name"
              fullWidth
            />
            <Field
              name="companyDetails.record_company"
              component={TextInput}
              label="Record Company"
              fullWidth
            />
            <Field
              name="companyDetails.label_company"
              component={TextInput}
              label="Label Company"
              fullWidth
            />
            <Field
              name="companyDetails.vat_number"
              component={TextInput}
              label="VAT Number"
              fullWidth
            />
            <Field
              name="companyDetails.income_tax_number"
              component={TextInput}
              label="Income Tax Number"
              fullWidth
            />
          </Box>

          {/* Contact Details */}

          <Box mb={3}>
            <Typography color="textPrimary" variant="h4">
              Contact Details
            </Typography>
            <Field
              name="contactDetails.email"
              component={TextInput}
              label="Email Address"
              fullWidth
            />
            <Field
              name="contactDetails.telephone_office"
              component={TextInput}
              label="Telephone (Office)"
              fullWidth
            />
          </Box>

          {/* Physical Address Details */}

          <Box mb={3}>
            <Typography color="textPrimary" variant="h4">
              Physical Address Details
            </Typography>
            <Field
              name="physicalAddressDetails.street"
              component={TextInput}
              label="Street Number & Name"
              fullWidth
            />
            <Field
              name="physicalAddressDetails.township_suburb_city_town"
              component={TextInput}
              label="Township/Suburb/City/Town"
              fullWidth
            />
            <Field
              name="physicalAddressDetails.province"
              component={TextInput}
              label="Province"
              fullWidth
            />
            <Field
              name="physicalAddressDetails.postal_code"
              component={TextInput}
              label="Postal Code"
              fullWidth
            />
            <Field
              name="physicalAddressDetails.country"
              component={TextInput}
              label="Country"
              fullWidth
            />
          </Box>

          {/* Postal Address Details */}

          <Box mb={3}>
            <Typography color="textPrimary" variant="h4">
              Postal Address Details
            </Typography>
            <Field
              name="postalAddressDetails.address_line_1"
              component={TextInput}
              label="Postal Address Line 1"
              fullWidth
            />
            <Field
              name="postalAddressDetails.address_line_2"
              component={TextInput}
              label="Postal Address Line 2"
              fullWidth
            />
            <Field
              name="postalAddressDetails.province"
              component={TextInput}
              label="Province"
              fullWidth
            />
            <Field
              name="postalAddressDetails.postal_code"
              component={TextInput}
              label="Postal Code"
              fullWidth
            />
            <Field
              name="postalAddressDetails.country"
              component={TextInput}
              label="Country"
              fullWidth
            />
          </Box>

          {/* Contact Person Details */}

          <Box mb={3}>
            <Typography color="textPrimary" variant="h4">
              Contact Person Details
            </Typography>
            <Field
              name="contactPersonDetails.first_name"
              component={TextInput}
              label="First Name"
              fullWidth
            />
            <Field
              name="contactPersonDetails.last_name"
              component={TextInput}
              label="Last Name"
              fullWidth
            />
            <Field
              name="contactPersonDetails.email"
              component={TextInput}
              label="Email Address"
              fullWidth
            />
            <Field
              name="contactPersonDetails.telephone_mobile"
              component={TextInput}
              label="Telephone (Mobile)"
              fullWidth
            />
            <Field
              name="contactPersonDetails.telephone_work"
              component={TextInput}
              label="Telephone (Work)"
              fullWidth
            />
          </Box>

          {/* Director Details */}

          <Box mb={3}>
            <Typography color="textPrimary" variant="h4">
              Director Details
            </Typography>
            <Field
              name="directorDetails.title"
              label="Title"
              options={[
                {
                  key: "mr",
                  label: "Mr",
                },
                {
                  key: "ms",
                  label: "Ms",
                },
                {
                  key: "mrs",
                  label: "Mrs",
                },
              ]}
              component={RadioGroupInput}
            />
            <Field
              name="directorDetails.first_name"
              component={TextInput}
              label="First Name"
              fullWidth
            />
            <Field
              name="directorDetails.last_name"
              component={TextInput}
              label="Last Name"
              fullWidth
            />
            <Field
              name="directorDetails.birth_country"
              label="Country of Birth"
              component={TextInput}
              fullWidth
            />
            <Field
              name="directorDetails.nationality"
              label="Nationality"
              component={TextInput}
              fullWidth
            />
            <Field
              name="directorDetails.identificationType"
              options={[
                {
                  key: "rsa_id",
                  label: "RSA ID",
                },
                {
                  key: "passport",
                  label: "Passport",
                },
              ]}
              component={RadioGroupInput}
            />
            {get(values, `directorDetails.identificationType`) === "rsa_id" && (
              <Field
                name="directorDetails.id_number"
                label="RSA ID Number"
                component={TextInput}
                fullWidth
              />
            )}
            {get(values, `directorDetails.identificationType`) ===
              "passport" && (
              <Field
                name="directorDetails.passport_number"
                label="Passport Number"
                component={TextInput}
                fullWidth
              />
            )}

            <Field
              name="directorDetails.dob"
              label="Date of Birth"
              component={DateInput}
              fullWidth
            />
            <Field
              name="directorDetails.passport_expiry"
              label="Passport Expiry Date"
              component={DateInput}
              fullWidth
            />
            <Field
              name="directorDetails.gender"
              label="Gender"
              options={[
                {
                  key: "male",
                  label: "Male",
                },
                {
                  key: "female",
                  label: "Female",
                },
              ]}
              component={RadioGroupInput}
            />

            <Field
              name="directorDetails.email"
              label="Email Address"
              component={TextInput}
              fullWidth
            />
            <Field
              name="directorDetails.telephone_mobile"
              label="Telephone (Mobile)"
              component={TextInput}
              fullWidth
            />
          </Box>

          {/* Banking Details */}

          <Box mb={3}>
            <Typography color="textPrimary" variant="h4">
              Banking Details
            </Typography>
            <Field
              name="bankingDetails.account_holder"
              component={TextInput}
              label="Account Holder"
              fullWidth
            />
            <Field
              name="bankingDetails.bank_name"
              component={TextInput}
              label="Bank Name"
              fullWidth
            />
            <Field
              name="bankingDetails.branch_code"
              component={TextInput}
              label="Branch Code"
              fullWidth
            />
            <Field
              name="bankingDetails.account_type"
              component={TextInput}
              label="Account Type"
              fullWidth
            />
            <Field
              name="bankingDetails.account_number"
              component={TextInput}
              label="Account Number"
              fullWidth
            />
          </Box>

          {/* Uploads Doc */}

          <Box mb={3}>
            <Typography
              color="textPrimary"
              variant="h4"
              style={{ marginBottom: "1rem" }}
            >
              Uploads the Supporting Documentation
            </Typography>
            <Box mb={2}>
              <Typography color="textPrimary">Registration Proof</Typography>
              <Field
                name="companyDetails.registration_docs_proof"
                component={TextInput}
                type="file"
                fullWidth
              />
              {get(values, `companyDetails.registration_docs_proof`) !== "" && (
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://via.placeholder.com/552"
                  />
                </Card>
              )}
            </Box>
            <Box mb={2}>
              <Typography color="textPrimary">Identification Proof</Typography>
              <Field
                name="directorDetails.id_proof"
                component={TextInput}
                type="file"
                fullWidth
              />
              {get(values, `directorDetails.id_proof`) !== "" && (
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://via.placeholder.com/552"
                  />
                </Card>
              )}
            </Box>
            <Box mb={2}>
              <Typography color="textPrimary">Account Proof</Typography>
              <Field
                name="bankingDetails.account_proof"
                component={TextInput}
                type="file"
                fullWidth
              />
              {get(values, `bankingDetails.account_proof`) !== "" && (
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://via.placeholder.com/552"
                  />
                </Card>
              )}
            </Box>
            <Box>
              <Typography color="textPrimary">Account Proof Consent</Typography>
              <Field
                name="bankingDetails.account_proof_consent"
                component={TextInput}
                type="file"
                fullWidth
              />
              {get(values, `bankingDetails.account_proof_consent`) !== "" && (
                <Card className={classes.root}>
                  <CardMedia
                    className={classes.media}
                    image="https://via.placeholder.com/552"
                  />
                </Card>
              )}
            </Box>
          </Box>

          {/* Terms & Conditions - Button Submit*/}

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

const CopyrightOwnerApplicationForm = () => {
  return <Formik initialValues={initialValues} component={InnerForm} />;
};

export default CopyrightOwnerApplicationForm;
