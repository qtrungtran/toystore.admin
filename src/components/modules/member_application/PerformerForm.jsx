import React, { useEffect, useMemo } from "react";
// import * as Yup from "yup";
import {
  PERFORMER_APPLICANT_TYPES,
  APPLICANT_SUPPORTING_DOCS_MAP,
} from "config/constants";
import { Formik, Form, Field } from "formik";
import { get, isEmpty } from "lodash";
import {
  Box,
  Container,
  FormControl,
  Typography,
  Button,
  Link,
  Checkbox,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@material-ui/core";
import CheckboxInput from "components/inputs/CheckboxInput";
import SelectInput from "components/inputs/SelectInput";
import RadioGroupInput from "components/inputs/RadioGroupInput";
import TextInput from "components/inputs/TextInput";
import DateInput from "components/inputs/DateInput";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Link as RouterLink } from "react-router-dom";

const initialValues = {
  performerApplicantType: "",
  requiredDocs: {},
  identification: {
    title: 1,
    identification_type: "",
    dob: null,
    id_number: "",
    passport_number: "",
    first_name: "",
    last_name: "",
    passport_expiry: null,
    gender: "",
    birth_country: "",
    residence_country: "",
    IPN: "",
    id_proof: "",
  },
  contact_details: {
    email: "",
    telephone_home: "",
    telephone_mobile: "",
    telephone_work: "",
  },
  home_address: {
    street: "",
    city: "",
    province: 1,
    postal_code: "",
    country: 1,
  },
  postal_address: {
    address_line_1: "",
    address_line_2: "",
    address_line_3: "",
    province: 1,
    postal_code: "",
    country: 1,
  },
  mandate: {
    indicator: "",
    is_neighbour_member: "",
    // AIE: "",
    // CGA: "",
    // CPRA: "",
    // GDA: "",
    // itsRight: "",
    // playRight: "",
    // PPL: "",
    // SAMI: "",
    // SENA: ""
    cmos: "",
  },
  banking_details: {
    owner_type: "",
    proof_of_banking: false,
    _3rd_partys_details: false,
    consent_or_proof_of_identification: false,
    account_holder: "",
    bank_name: "",
    branch_code: "",
    account_type: "",
    account_number: "",
    account_proof: "",
    account_proof_consent: [],
  },
  alternative_contact: {
    title: 1,
    first_name: "",
    last_name: "",
    relationship: "",
    email: "",
    telephone_home: "",
    telephone_mobile: "",
    telephone_work: "",
    home_address: {
      street: "",
      city: "",
      province: 1,
      postal_code: "",
      country: 1,
    },
    postal_address: {
      address_line_1: "",
      address_line_2: "",
      address_line_3: "",
      province: 1,
      postal_code: "",
      country: 1,
    },
  },
  beneficiary: {
    title: 1,
    first_name: "",
    last_name: "",
    email: "",
    telephone_home: "",
    telephone_mobile: "",
    telephone_work: "",
    split_percentage: "",
  },
  policy: false,
};

const performerApplicantTypeOptions = Object.values(PERFORMER_APPLICANT_TYPES);

// const validationSchema = Yup.object().shape({
//   performerApplicantType: Yup.string().required("Required!"),
//   requiredDocs: Yup.object().shape(
//     Object.values(
//       APPLICANT_SUPPORTING_DOCS_MAP[
//         PERFORMER_APPLICANT_TYPES.SUCCESSOR_APPLICANT.key
//       ]
//     ).reduce((value, { key }) => {
//       return Object.assign(value, { [key]: Yup.boolean() });
//     }, {})
//   ),
// });

// const validationPersonalDetails = Yup.object().shape({
//   identificationType: Yup.string().required(),
//   birthDate: Yup.date().required(),
//   rsa_id_number: Yup.string().required(),
//   firstName: Yup.string().required(),
//   lastName: Yup.string().required(),
//   passportExpiryDate: Yup.date().required(),
//   gender: Yup.string().required(),
//   countryOfBirth: Yup.string().required(),
//   countryOfResidence: Yup.string().required(),
//   IPNNumber: Yup.string().required(),
// });

// const validationContactDetails = Yup.object().shape({
//   emailAddress: Yup.string().email().required(),
//   telephoneHome: Yup.string().required(),
//   telephoneMobile: Yup.string().required(),
//   telephoneWork: Yup.string().required(),
// });

// const validationHomeAddressDetails = Yup.object().shape({
//   streetNumberAndName: Yup.string().required(),
//   townshipSuburbCityTown: Yup.string().required(),
//   province: Yup.string().required(),
//   postalCode: Yup.string().required(),
//   country: Yup.string().required(),
// });

// const validationPostalAddressDetails = Yup.object().shape({
//   postalAddressLine1: Yup.string().required(),
//   postalAddressLine2: Yup.string().required(),
//   province: Yup.string().required(),
//   postalCode: Yup.string().required(),
//   country: Yup.string().required(),
// });

// const validationMandateDetails = Yup.object().shape({
//   mandateIndicator: Yup.string().required(),
//   memberOfNeighbouringRightsCMOsInOtherCountries: Yup.string().required(),
// });

// const validationBankingDetails = Yup.object().shape({
//   bankingType: Yup.string().required(),
//   accountHolder: Yup.string().required(),
//   bankName: Yup.string().required(),
//   branchCode: Yup.string().required(),
//   accountType: Yup.string().required(),
//   accountNumber: Yup.string().required(),
// });

const InnerForm = ({ values, handleChange, setValues, setFieldValue, ...rest }) => {
  const { performerApplicantType, requiredDocs, banking_details, identification } = values;
  const requiredDocuments = useMemo(() => {
    const docs = APPLICANT_SUPPORTING_DOCS_MAP[performerApplicantType] || {};
    return Object.values(docs);
  }, [performerApplicantType]);

  // const [
  //   isValidationPersonalDetails,
  //   setIsValidationPersonalDetails,
  // ] = useState(false);
  // const [isValidationContactDetails, setIsValidationContactDetails] = useState(
  //   false
  // );
  // const [
  //   isValidationHomeAddressDetails,
  //   setIsValidationHomeAddressDetails,
  // ] = useState(false);
  // const [
  //   isValidationPostalAddressDetails,
  //   setIsValidationPostalAddressDetails,
  // ] = useState(false);
  // const [isValidationMandateDetails, setIsValidationMandateDetails] = useState(
  //   false
  // );
  // const [isValidationBankingDetails, setIsValidationBankingDetails] = useState(
  //   false
  // );

  useEffect(() => {
    const initialRequiredDocValues = Object.values(
      APPLICANT_SUPPORTING_DOCS_MAP[performerApplicantType] || []
    ).reduce((value, { key }) => {
      return Object.assign(value, { [key]: false });
    }, {});
    setFieldValue("requiredDocs", initialRequiredDocValues);
  }, [performerApplicantType, setFieldValue]);

  const isAllRequiredDocsSelected = useMemo(() => {
    return (
      !isEmpty(requiredDocs) &&
      Object.values(requiredDocs).every((value) => value)
    );
  }, [requiredDocs]);

  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form>
          {/* Performer Type */}
          <Box>
            <Typography color="textPrimary" variant="h4">
              Performer Applicant Type
            </Typography>
            <Field
              name="performerApplicantType"
              options={performerApplicantTypeOptions}
              component={SelectInput}
              fullWidth
              label="Performer Type"
            />
          </Box>
          {/* Required Documents */}
          {!isEmpty(requiredDocuments) && (
            <Box>
              <Typography color="textPrimary" variant="h4">
                Required Documents
              </Typography>
              <FormControl style={{ display: "flex" }}>
                {requiredDocuments.map(({ label, key }) => {
                  return (
                    <Field
                      key={key}
                      component={CheckboxInput}
                      name={`requiredDocs.${key}`}
                      label={label}
                    />
                  );
                })}
              </FormControl>
            </Box>
          )}
          {/* Personal Details */}
          {isAllRequiredDocsSelected && (
            <Box>
              <Typography color="textPrimary" variant="h4">
                Personal Details
              </Typography>
              <Field
                name="identification.title"
                label="Title (Mr, Ms, Mrs)"
                options={[
                  {
                    key: "1",
                    label: "Mr",
                  },
                  {
                    key: "2",
                    label: "Ms",
                  },
                  {
                    key: "3",
                    label: "Mrs",
                  },
                ]}
                component={SelectInput}
                fullWidth
              />
              <Field
                name="identification.identification_type"
                label="Identification Type"
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
              {get(values, `identification.identification_type`) ===
                "rsa_id" && (
                <Field
                  name="identification.id_number"
                  label="RSA ID Number"
                  component={TextInput}
                  fullWidth
                />
              )}
              {get(values, `identification.identification_type`) ===
                "passport" && (
                <Field
                  name="identification.passport_number"
                  label="Passport Number"
                  component={TextInput}
                  fullWidth
                />
              )}
              <Field
                name="identification.first_name"
                component={TextInput}
                label="First Name"
                fullWidth
              />
              <Field
                name="identification.last_name"
                component={TextInput}
                label="Last Name"
                fullWidth
              />
              {/* <Box>
              <Typography color="textPrimary" variant="h4">
                Performer Type
              </Typography>
            </Box> */}
              <Field
                name="identification.dob"
                label="Date of Birth"
                component={DateInput}
                fullWidth
              />
              <Field
                name="identification.passport_expiry"
                label="Passport Expiry Date"
                component={DateInput}
                fullWidth
              />
              <Field
                name="identification.gender"
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
                name="identification.birth_country"
                label="Country of Birth"
                component={TextInput}
                fullWidth
              />
              <Field
                name="identification.residence_country"
                label="Country of Residence"
                component={TextInput}
                fullWidth
              />
              <Field
                name="identification.IPN"
                label="IPN Number"
                component={TextInput}
                fullWidth
              />
            </Box>
          )}
          {/* Contact Details */}
          {isAllRequiredDocsSelected && (
            <Box mt={3}>
              <Typography color="textPrimary" variant="h4">
                Contact Details
              </Typography>
              <Field
                name="contact_details.email"
                component={TextInput}
                label="Email Address"
                fullWidth
              />
              <Field
                name="contact_details.telephone_home"
                component={TextInput}
                label="Telephone (Home)"
                fullWidth
              />
              <Field
                name="contact_details.telephone_mobile"
                component={TextInput}
                label="Telephone (Mobile)"
                fullWidth
              />
              <Field
                name="contact_details.telephone_work"
                component={TextInput}
                label="Telephone (Work)"
                fullWidth
              />
            </Box>
          )}
          {/* Home Address Details */}
          {isAllRequiredDocsSelected && (
            <Box mt={3}>
              <Typography color="textPrimary" variant="h4">
                Home Address Details
              </Typography>
              <Field
                name="home_address.street"
                component={TextInput}
                label="Street Number & Name"
                fullWidth
              />
              <Field
                name="home_address.city"
                component={TextInput}
                label="Township/Suburb/City/Town"
                fullWidth
              />
              <Field
                name="home_address.province"
                component={SelectInput}
                options={[
                  {
                    key: 1,
                    label: "Da Nang"
                  },
                  {
                    key: 2,
                    label: "T-T-Hue"
                  },
                  {
                    key: 3,
                    label: "Quang Nam"
                  },
                ]}
                label="Province"
                fullWidth
              />
              <Field
                name="home_address.postal_code"
                component={TextInput}
                label="Postal Code"
                fullWidth
              />
              <Field
                name="home_address.country"
                component={SelectInput}
                options={[
                  {
                    key: 1,
                    label: "Viet Nam"
                  },
                  {
                    key: 2,
                    label: "America"
                  },
                  {
                    key: 3,
                    label: "Japan"
                  },
                ]}
                label="Country"
                fullWidth
              />
            </Box>
          )}
          {/* Postal Address Details */}
          {isAllRequiredDocsSelected && (
            <Box mt={3}>
              <Typography color="textPrimary" variant="h4">
                Postal Address Details
              </Typography>
              <Field
                name="postal_address.address_line_1"
                component={TextInput}
                label="Postal Address Line 1"
                fullWidth
              />
              <Field
                name="postal_address.address_line_2"
                component={TextInput}
                label="Postal Address Line 2"
                fullWidth
              />
              <Field
                name="postal_address.address_line_3"
                component={TextInput}
                label="Postal Address Line 3"
                fullWidth
              />
              <Field
                name="postal_address.province"
                component={SelectInput}
                options={[
                  {
                    key: 1,
                    label: "Da Nang"
                  },
                  {
                    key: 2,
                    label: "T-T-Hue"
                  },
                  {
                    key: 3,
                    label: "Quang Nam"
                  },
                ]}
                label="Province"
                fullWidth
              />
              <Field
                name="postal_address.postal_code"
                component={TextInput}
                label="Postal Code"
                fullWidth
              />
              <Field
                name="postal_address.country"
                component={SelectInput}
                options={[
                  {
                    key: 1,
                    label: "Viet Nam"
                  },
                  {
                    key: 2,
                    label: "America"
                  },
                  {
                    key: 3,
                    label: "Japan"
                  },
                ]}
                label="Country"
                fullWidth
              />
            </Box>
          )}
          {/* Mandate Details */}
          {isAllRequiredDocsSelected && (
            <Box mt={3}>
              <Typography color="textPrimary" variant="h4">
                Mandate Details
              </Typography>
              <Box mt={1}>
                <Field
                  name="mandate.indicator"
                  label="Mandate Indicator"
                  options={[
                    {
                      key: "worldwide",
                      label: "Worldwide",
                    },
                    {
                      key: "south_africa_and_africa",
                      label: "South Africa and Africa",
                    },
                  ]}
                  component={RadioGroupInput}
                />
              </Box>
              <Box mt={1}>
                <Field
                  name="mandate.is_neighbour_member"
                  label="Member of Neighbouring Rights CMOs in other countries?"
                  options={[
                    {
                      key: "true",
                      label: "Yes",
                    },
                    {
                      key: "false",
                      label: "No",
                    },
                  ]}
                  component={RadioGroupInput}
                />
              </Box>
              {get(
                values,
                `mandate.is_neighbour_member`
              ) === "true" && (
                // <div>
                //   <Field
                //     name="mandateDetails.AIE"
                //     label="AIE"
                //     component={TextInput}
                //     fullWidth
                //   />
                //   <Field
                //     name="mandateDetails.CGA"
                //     label="CGA"
                //     component={TextInput}
                //     fullWidth
                //   />
                //   <Field
                //     name="mandateDetails.CPRA"
                //     label="CPRA"
                //     component={TextInput}
                //     fullWidth
                //   />
                //   <Field
                //     name="mandateDetails.GDA"
                //     label="GDA"
                //     component={TextInput}
                //     fullWidth
                //   />
                //   <Field
                //     name="mandateDetails.itsRight"
                //     label="ItsRight"
                //     component={TextInput}
                //     fullWidth
                //   />
                //   <Field
                //     name="mandateDetails.playRight"
                //     label="PlayRight"
                //     component={TextInput}
                //     fullWidth
                //   />
                //   <Field
                //     name="mandateDetails.PPL"
                //     label="PPL"
                //     component={TextInput}
                //     fullWidth
                //   />
                //   <Field
                //     name="mandateDetails.SAMI"
                //     label="SAMI"
                //     component={TextInput}
                //     fullWidth
                //   />
                //   <Field
                //     name="mandateDetails.SENA"
                //     label="SENA"
                //     component={TextInput}
                //     fullWidth
                //   />
                // </div>
                <Box ml={2}>
                  <Field
                    name="mandate.cmos"
                    label="CMOs"
                    options={[
                      {
                        key: "AIE",
                        label: "AIE",
                      },
                      {
                        key: "CGA",
                        label: "CGA",
                      },
                      {
                        key: "CPRA",
                        label: "CPRA",
                      },
                      {
                        key: "GDA",
                        label: "GDA",
                      },
                      {
                        key: "itsRight",
                        label: "ItsRight",
                      },
                      {
                        key: "playRight",
                        label: "PlayRight",
                      },
                      {
                        key: "PPL",
                        label: "PPL",
                      },
                      {
                        key: "SAMI",
                        label: "SAMI",
                      },
                      {
                        key: "SENA",
                        label: "SENA",
                      },
                    ]}
                    component={SelectInput}
                  />
                </Box>
              )}
            </Box>
          )}
          {/* Banking Details */}
          {isAllRequiredDocsSelected && (
            <Box mt={3}>
              <Typography color="textPrimary" variant="h4">
                Banking Details
              </Typography>
              {/* Banking Type Documents */}
              <Box mt={1}>
                <Field
                  name="banking_details.owner_type"
                  label="Type (Own/3rd Party)"
                  options={[
                    {
                      key: "1",
                      label: "Own",
                    },
                    {
                      key: "2",
                      label: "3rd Party",
                    },
                  ]}
                  component={RadioGroupInput}
                />
                {get(values, `banking_details.owner_type`) === "1" && (
                  <Box ml={2}>
                    <Typography color="textPrimary" variant="h5">
                      Required Documents
                    </Typography>
                    <FormControl style={{ display: "flex" }}>
                      <Field
                        name="banking_details.proof_of_banking"
                        label="Proof of Banking"
                        component={CheckboxInput}
                      />
                    </FormControl>
                  </Box>
                )}
                {get(values, `banking_details.owner_type`) === "2" && (
                  <Box ml={2}>
                    <Typography color="textPrimary" variant="h5">
                      Required Documents
                    </Typography>
                    <FormControl style={{ display: "flex" }}>
                      <Field
                        name="banking_details._3rd_partys_details"
                        label="3rd Party’s Details"
                        component={CheckboxInput}
                      />
                      <Field
                        name="banking_details.consent_or_proof_of_identification"
                        label="Consent or Proof of Identification"
                        component={CheckboxInput}
                      />
                    </FormControl>
                  </Box>
                )}
              </Box>
              <Box>
                <Field
                  name="banking_details.account_holder"
                  label="Account Holder"
                  component={TextInput}
                  fullWidth
                />
                <Field
                  name="banking_details.bank_name"
                  label="Bank Name"
                  component={TextInput}
                  fullWidth
                />
                <Field
                  name="banking_details.branch_code"
                  label="Branch Code"
                  component={TextInput}
                  fullWidth
                />
                <Field
                  name="banking_details.account_type"
                  label="Account Type"
                  component={TextInput}
                  fullWidth
                />
                <Field
                  name="banking_details.account_number"
                  label="Account Number"
                  component={TextInput}
                  fullWidth
                />
              </Box>
            </Box>
          )}
          {/* Alternative Contact Person Details */}
          {isAllRequiredDocsSelected && (
            <Box mt={3}>
              <Typography color="textPrimary" variant="h4">
                Alternative Contact Person Details
              </Typography>
              <Field
                name="alternative_contact.title"
                label="Title (Mr, Ms, Mrs)"
                options={[
                  {
                    key: 1,
                    label: "Mr",
                  },
                  {
                    key: 2,
                    label: "Ms",
                  },
                  {
                    key: 3,
                    label: "Mrs",
                  },
                ]}
                component={SelectInput}
                fullWidth
              />
              <Field
                name="alternative_contact.first_name"
                component={TextInput}
                label="First Name"
                fullWidth
              />
              <Field
                name="alternative_contact.last_name"
                component={TextInput}
                label="Last Name"
                fullWidth
              />
              <Field
                name="alternative_contact.relationship"
                component={TextInput}
                label="Relationship to Applicant"
                fullWidth
              />
              <Field
                name="alternative_contact.email"
                component={TextInput}
                label="Email Address"
                fullWidth
              />
              <Field
                name="alternative_contact.telephone_home"
                component={TextInput}
                label="Telephone (Home)"
                fullWidth
              />
              <Field
                name="alternative_contact.telephone_mobile"
                component={TextInput}
                label="Telephone (Mobile)"
                fullWidth
              />
              <Field
                name="alternative_contact.telephone_work"
                component={TextInput}
                label="Telephone (Work)"
                fullWidth
              />
              {/* Home Address Details */}
              <Box mt={2}></Box>
              <Typography color="textPrimary" variant="h5">
                Home Address Details
              </Typography>
              <Box ml={2}>
                <Field
                  name="alternative_contact.home_address.street"
                  component={TextInput}
                  label="Street Number & Name"
                  fullWidth
                />
                <Field
                  name="alternative_contact.home_address.city"
                  component={TextInput}
                  label="Township/Suburb/City/Town"
                  fullWidth
                />
                <Field
                  name="alternative_contact.home_address.province"
                  component={SelectInput}
                  options={[
                    {
                      key: 1,
                      label: "Da Nang"
                    },
                    {
                      key: 2,
                      label: "T-T-Hue"
                    },
                    {
                      key: 3,
                      label: "Quang Nam"
                    },
                  ]}
                  label="Province"
                  fullWidth
                />
                <Field
                  name="alternative_contact.home_address.postal_code"
                  component={TextInput}
                  label="Postal Code"
                  fullWidth
                />
                <Field
                  name="alternative_contact.home_address.country"
                  component={SelectInput}
                  options={[
                    {
                      key: 1,
                      label: "Viet Nam"
                    },
                    {
                      key: 2,
                      label: "America"
                    },
                    {
                      key: 3,
                      label: "Japan"
                    },
                  ]}
                  label="Country"
                  fullWidth
                />
              </Box>
              {/* Postal Address Details */}
              <Box mt={2}></Box>
              <Typography color="textPrimary" variant="h5">
                Postal Address Details
              </Typography>
              <Box ml={2}>
                <Field
                  name="alternative_contact.postal_address.address_line_1"
                  component={TextInput}
                  label="Postal Address Line 1"
                  fullWidth
                />
                <Field
                  name="alternative_contact.postal_address.address_line_2"
                  component={TextInput}
                  label="Postal Address Line 2"
                  fullWidth
                />
                <Field
                  name="alternative_contact.postal_address.address_line_3"
                  component={TextInput}
                  label="Postal Address Line 3"
                  fullWidth
                />
                <Field
                  name="alternative_contact.postal_address.province"
                  component={SelectInput}
                  options={[
                    {
                      key: 1,
                      label: "Da Nang"
                    },
                    {
                      key: 2,
                      label: "T-T-Hue"
                    },
                    {
                      key: 3,
                      label: "Quang Nam"
                    },
                  ]}
                  label="Province"
                  fullWidth
                />
                <Field
                  name="alternative_contact.postal_address.postal_code"
                  component={TextInput}
                  label="Postal Code"
                  fullWidth
                />
                <Field
                  name="alternative_contact.postal_address.country"
                  component={SelectInput}
                  options={[
                    {
                      key: 1,
                      label: "Viet Nam"
                    },
                    {
                      key: 2,
                      label: "America"
                    },
                    {
                      key: 3,
                      label: "Japan"
                    },
                  ]}
                  label="Country"
                  fullWidth
                />
              </Box>
            </Box>
          )}
          {/* Beneficiary Details */}
          {isAllRequiredDocsSelected && (
            <Box mt={3}>
              <Typography color="textPrimary" variant="h4">
                Beneficiary Details
              </Typography>
              <Box mt={2}/>
              <Field
                name="beneficiary.title"
                label="Title (Mr, Ms, Mrs)"
                options={[
                  {
                    key: 1,
                    label: "Mr",
                  },
                  {
                    key: 2,
                    label: "Ms",
                  },
                  {
                    key: 3,
                    label: "Mrs",
                  },
                ]}
                component={SelectInput}
              />
              <Field
                name="beneficiary.first_name"
                component={TextInput}
                label="First Name"
                fullWidth
              />
              <Field
                name="beneficiary.last_name"
                component={TextInput}
                label="Last Name"
                fullWidth
              />
              <Field
                name="beneficiary.email"
                component={TextInput}
                label="Email Address"
                fullWidth
              />
              <Field
                name="beneficiary.telephone_home"
                component={TextInput}
                label="Telephone (Home)"
                fullWidth
              />
              <Field
                name="beneficiary.telephone_mobile"
                component={TextInput}
                label="Telephone (Mobile)"
                fullWidth
              />
              <Field
                name="beneficiary.telephone_work"
                component={TextInput}
                label="Telephone (Work)"
                fullWidth
              />
              <Field
                name="beneficiary.split_percentage"
                component={TextInput}
                label="Split Percentage"
                fullWidth
              />
            </Box>
          )}
          {/* Uploads the Supporting Documentation */}
          {isAllRequiredDocsSelected && (
            <Box mt={3}>
              <Typography color="textPrimary" variant="h4">
                Upload Supporting Documentation
              </Typography>
              <Box mt={1} ml={2}>
                <Typography>
                  Account Proof File
                </Typography>
                <input 
                  type="file" 
                  accept="image/*"
                  name="banking_details.account_proof"
                  id="banking_details.account_proof"
                  style={{display: "none"}}
                  onChange={(event) => {
                    banking_details.accountProof = event.target.files[0];
                  }}
                />
                <label htmlFor="banking_details.account_proof">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
                {banking_details.account_proof && (
                  <Box my={2}>
                    <Card>
                      <CardContent>
                        <Typography variant="h5">
                          {banking_details.account_proof.name}
                        </Typography>
                      </CardContent>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Account Proof File"
                          height="200"
                          title="Account Proof File"
                          src="https://i-dulich.vnecdn.net/2019/11/22/2-1574406624_680x0.jpg"
                        />
                      </CardActionArea>
                    </Card>
                  </Box>
                )}
              </Box>
              <Box mt={1} ml={2}>
                <Typography>
                  Account Proof Consent Files
                </Typography>
                <input 
                  type="file" 
                  accept="image/*"
                  name="banking_details.account_proof_consent"
                  id="banking_details.account_proof_consent"
                  style={{display: "none"}}
                  multiple
                  onChange={(event) => {
                    banking_details.account_proof_consent = Array.from(event.target.files);
                  }}
                />
                <label htmlFor="banking_details.account_proof_consent">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
                {banking_details.account_proof_consent.length !== 0 && (
                  <Box my={2}>
                    {banking_details.account_proof_consent.map((item) => {
                      return (
                        <Box my={1} key={item.name}>
                          <Card>
                            <CardContent>
                              <Typography variant="h5">
                                {item.name}
                              </Typography>
                            </CardContent>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="Account Proof File"
                                height="200"
                                title="Account Proof File"
                                src="https://i-dulich.vnecdn.net/2019/11/22/2-1574406624_680x0.jpg"
                              />
                            </CardActionArea>
                          </Card>
                        </Box>
                      )
                    })}
                  </Box>
                )}
              </Box>
              <Box mt={1} ml={2}>
                <Typography>
                  Id Proof File
                </Typography>
                <input 
                  type="file" 
                  accept="image/*"
                  name="identification.id_proof"
                  id="identification.id_proof"
                  style={{display: "none"}}
                  onChange={(event) => {
                    identification.id_proof = event.target.files[0];
                  }}
                />
                <label htmlFor="identification.id_proof">
                  <Button variant="contained" color="primary" component="span">
                    Upload
                  </Button>
                </label>
                {identification.id_proof && (
                  <Box my={2}>
                    <Card>
                      <CardContent>
                        <Typography variant="h5">
                          {identification.id_proof.name}
                        </Typography>
                      </CardContent>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Account Proof File"
                          height="200"
                          title="Account Proof File"
                          src="https://i-dulich.vnecdn.net/2019/11/22/2-1574406624_680x0.jpg"
                        />
                      </CardActionArea>
                    </Card>
                  </Box>
                )}
              </Box>
            </Box>
          )}
          {isAllRequiredDocsSelected && (
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
          )}
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

const PerformerApplicationForm = () => {
  return <Formik initialValues={initialValues} component={InnerForm} />;
};

export default PerformerApplicationForm;
