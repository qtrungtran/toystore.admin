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
  Checkbox,
  Link,
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
  performerApplicantType: "ACTUAL_PERFORMER",
  requiredDocs: {},
  personalDetails: {
    identificationType: "rsa_id",
    birthDate: null,
    rsa_id_number: "12312334",
    firstName: "John",
    lastName: "Thomad",
    passportExpiryDate: null,
    gender: "male",
    countryOfBirth: "Viet Nam",
    countryOfResidence: "Viet Nam",
    IPNNumber: "",
    IdProof: null
  },
  contactDetails: {
    emailAddress: "an.nguyen.24hdev@gmail.com",
    telephoneHome: "123456789",
    telephoneMobile: "0124578963",
    telephoneWork: "7894561330",
  },
  homeAddressDetails: {
    streetNumberAndName: "128 Nguyen Van Linh",
    townshipSuburbCityTown: "Lien Chieu",
    province: "Da Nang",
    postalCode: "14247258",
    country: "Viet Nam"
  },
  postalAddressDetails: {
    postalAddressLine1: "128 Nguyen Van Linh",
    postalAddressLine2: "128 Nguyen Van Linh",
    province: "Da Nang",
    postalCode: "14245678",
    country: "Viet Nam"
  },
  mandateDetails: {
    mandateIndicator: "worldwide",
    memberOfNeighbouringRightsCMOsInOtherCountries: "yes",
    // AIE: "7899",
    // CGA: "44411",
    // CPRA: "222454",
    // GDA: "5424842",
    // itsRight: "45545",
    // playRight: "54544",
    // PPL: "548451",
    // SAMI: "4521",
    // SENA: "55555"
    cmos: "SENA"
  },
  bankingDetails: {
    bankingType: "own",
    proofOfBanking: true,
    _3rdPartysDetails: false,
    consentOrProofOfIdentification: false,
    accountHolder: "An Nguyen",
    bankName: "BIDV",
    branchCode: "124579338754",
    accountType: "master",
    accountNumber: "147852369",
    accountProof: null,
    accountProofConsent: []
  },
  alternativeContactPersonDetails: {
    title: "mr",
    firstName: "Thanat",
    lastName: "Semid",
    relationshipToApplicant: "father",
    emailAddress: "an.nguyen.24hdev@gmail.com",
    telephoneHome: "123456798",
    telephoneMobile: "124557896",
    telephoneWork: "24512221545",
    homeAddressDetails: {
      streetNumberAndName: "212 Nguyen Van Linh",
      townshipSuburbCityTown: "Lien Chieu",
      province: "Da Nang",
      postalCode: "154587",
      country: "Viet Nam"
    },
    postalAddressDetails: {
      postalAddressLine1: "212 Nguyen Van Linh",
      postalAddressLine2: "212 Nguyen Van Linh",
      province: "Da Nang",
      postalCode: "1425478",
      country: "Viet Nam"
    },
  },
  beneficiaryDetails: {
    title: "ms",
    firstName: "Thon",
    lastName: "Wilad",
    emailAddress: "an.nguyen.24hdev@gmail.com",
    telephoneHome: "124578963",
    telephoneMobile: "12589637",
    telephoneWork: "79682111222",
    splitPercentage: "50-50"
  },
  selectedFiles: null,
  performerStatus: "",
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

const InnerForm = ({ values, handleChange, setValues, setFieldValue, ...rest }) => {
  const { performerApplicantType, bankingDetails, personalDetails } = values;
  const requiredDocuments = useMemo(() => {
    const docs = APPLICANT_SUPPORTING_DOCS_MAP[performerApplicantType] || {};
    return Object.values(docs);
  }, [performerApplicantType]);

  useEffect(() => {
    const initialRequiredDocValues = Object.values(
      APPLICANT_SUPPORTING_DOCS_MAP[performerApplicantType] || []
    ).reduce((value, { key }) => {
      return Object.assign(value, { [key]: true });
    }, {});
    setFieldValue("requiredDocs", initialRequiredDocValues);
  }, [performerApplicantType, setFieldValue]);

  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form>
          <Box mb={2}>
            <Typography color="textPrimary" variant="h1">
              Update Performer Details
            </Typography>
          </Box>
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
          <Box>
            <Typography color="textPrimary" variant="h4">
              Personal Details
            </Typography>
            <Field
              name="personalDetails.identificationType"
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
            {get(values, `personalDetails.identificationType`) ===
              "rsa_id" && (
              <Field
                name="personalDetails.rsa_id_number"
                label="RSA ID Number"
                component={TextInput}
                fullWidth
              />
            )}
            {get(values, `personalDetails.identificationType`) ===
              "passport" && (
              <Field
                name="personalDetails.rsa_id_number"
                label="Passport Number"
                component={TextInput}
                fullWidth
              />
            )}
            <Field
              name="personalDetails.firstName"
              component={TextInput}
              label="First Name"
              fullWidth
            />
            <Field
              name="personalDetails.lastName"
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
              name="personalDetails.birthDate"
              label="Date of Birth"
              component={DateInput}
              fullWidth
              disabled
            />
            <Field
              name="personalDetails.passportExpiryDate"
              label="Passport Expiry Date"
              component={DateInput}
              fullWidth
              disabled
            />
            <Field
              name="personalDetails.gender"
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
              name="personalDetails.countryOfBirth"
              label="Country of Birth"
              component={TextInput}
              fullWidth
              disabled
            />
            <Field
              name="personalDetails.countryOfResidence"
              label="Country of Residence"
              component={TextInput}
              fullWidth
              disabled
            />
            <Field
              name="personalDetails.IPNNumber"
              label="IPN Number"
              component={TextInput}
              fullWidth
            />
          </Box>
          {/* Contact Details */}
          <Box mt={3}>
            <Typography color="textPrimary" variant="h4">
              Contact Details
            </Typography>
            <Field
              name="contactDetails.emailAddress"
              component={TextInput}
              label="Email Address"
              fullWidth
            />
            <Field
              name="contactDetails.telephoneHome"
              component={TextInput}
              label="Telephone (Home)"
              fullWidth
            />
            <Field
              name="contactDetails.telephoneMobile"
              component={TextInput}
              label="Telephone (Mobile)"
              fullWidth
            />
            <Field
              name="contactDetails.telephoneWork"
              component={TextInput}
              label="Telephone (Work)"
              fullWidth
            />
          </Box>
          {/* Home Address Details */}
          <Box mt={3}>
            <Typography color="textPrimary" variant="h4">
              Home Address Details
            </Typography>
            <Field
              name="homeAddressDetails.streetNumberAndName"
              component={TextInput}
              label="Street Number & Name"
              fullWidth
            />
            <Field
              name="homeAddressDetails.townshipSuburbCityTown"
              component={TextInput}
              label="Township/Suburb/City/Town"
              fullWidth
            />
            <Field
              name="homeAddressDetails.province"
              component={TextInput}
              label="Province"
              fullWidth
            />
            <Field
              name="homeAddressDetails.postalCode"
              component={TextInput}
              label="Postal Code"
              fullWidth
            />
            <Field
              name="homeAddressDetails.country"
              component={TextInput}
              label="Country"
              fullWidth
            />
          </Box>
          {/* Postal Address Details */}
          <Box mt={3}>
            <Typography color="textPrimary" variant="h4">
              Postal Address Details
            </Typography>
            <Field
              name="postalAddressDetails.postalAddressLine1"
              component={TextInput}
              label="Postal Address Line 1"
              fullWidth
            />
            <Field
              name="postalAddressDetails.postalAddressLine2"
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
              name="postalAddressDetails.postalCode"
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
          {/* Mandate Details */}
          <Box mt={3}>
            <Typography color="textPrimary" variant="h4">
              Mandate Details
            </Typography>
            <Box mt={1}>
              <Field
                name="mandateDetails.mandateIndicator"
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
                name="mandateDetails.memberOfNeighbouringRightsCMOsInOtherCountries"
                label="Member of Neighbouring Rights CMOs in other countries?"
                options={[
                  {
                    key: "yes",
                    label: "Yes",
                  },
                  {
                    key: "no",
                    label: "No",
                  },
                ]}
                component={RadioGroupInput}
              />
            </Box>
            {get(values, `mandateDetails.memberOfNeighbouringRightsCMOsInOtherCountries`) ===
              "yes" && (
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
                  name="mandateDetails.cmos"
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
                  component={RadioGroupInput}
                />
              </Box>
            )}
          </Box>
          {/* Banking Details */}
          <Box mt={3}>
            <Typography color="textPrimary" variant="h4">
              Banking Details
            </Typography>
            {/* Banking Type Documents */}
            <Box mt={1}>
              <Field
                name="bankingDetails.bankingType"
                label="Type (Own/3rd Party)"
                options={[
                  {
                    key: "own",
                    label: "Own",
                  },
                  {
                    key: "3rdParty",
                    label: "3rd Party",
                  },
                ]}
                component={RadioGroupInput}
              />
              {get(values, `bankingDetails.bankingType`) ===
                "own" && (
                  <Box ml={2}>
                    <Typography color="textPrimary" variant="h5">
                      Required Documents
                    </Typography>
                    <FormControl style={{ display: "flex" }}>
                      <Field
                        name="bankingDetails.proofOfBanking"
                        label="Proof of Banking"
                        component={CheckboxInput}
                      />
                    </FormControl>
                  </Box>
              )}
              {get(values, `bankingDetails.bankingType`) ===
                "3rdParty" && (
                  <Box ml={2}>
                    <Typography color="textPrimary" variant="h5">
                      Required Documents
                    </Typography>
                    <FormControl style={{ display: "flex" }}>
                      <Field
                        name="bankingDetails._3rdPartysDetails"
                        label="3rd Party’s Details"
                        component={CheckboxInput}
                      />
                      <Field
                        name="bankingDetails.consentOrProofOfIdentification"
                        label="Consent or Proof of Identification"
                        component={CheckboxInput}
                      />
                    </FormControl>
                  </Box>
              )}
            </Box>
            <Box>
              <Field
                name="bankingDetails.accountHolder"
                label="Account Holder"
                component={TextInput}
                fullWidth
              />
              <Field
                name="bankingDetails.bankName"
                label="Bank Name"
                component={TextInput}
                fullWidth
              />
              <Field
                name="bankingDetails.branchCode"
                label="Branch Code"
                component={TextInput}
                fullWidth
              />
              <Field
                name="bankingDetails.accountType"
                label="Account Type"
                component={TextInput}
                fullWidth
              />
              <Field
                name="bankingDetails.accountNumber"
                label="Account Number"
                component={TextInput}
                fullWidth
              />
            </Box>
          </Box>
          {/* Alternative Contact Person Details */}
          <Box mt={3}>
            <Typography color="textPrimary" variant="h4">
              Alternative Contact Person Details
            </Typography>
            <Box mt={2}/>
            <Field
              name="alternativeContactPersonDetails.title"
              label="Title (Mr, Ms, Mrs)"
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
              name="alternativeContactPersonDetails.firstName"
              component={TextInput}
              label="First Name"
              fullWidth
            />
            <Field
              name="alternativeContactPersonDetails.lastName"
              component={TextInput}
              label="Last Name"
              fullWidth
            />
            <Field
              name="alternativeContactPersonDetails.relationshipToApplicant"
              component={TextInput}
              label="Relationship to Applicant"
              fullWidth
            />
            <Field
              name="alternativeContactPersonDetails.emailAddress"
              component={TextInput}
              label="Email Address"
              fullWidth
            />
            <Field
              name="alternativeContactPersonDetails.telephoneHome"
              component={TextInput}
              label="Telephone (Home)"
              fullWidth
            />
            <Field
              name="alternativeContactPersonDetails.telephoneMobile"
              component={TextInput}
              label="Telephone (Mobile)"
              fullWidth
            />
            <Field
              name="alternativeContactPersonDetails.telephoneWork"
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
                name="alternativeContactPersonDetails.homeAddressDetails.streetNumberAndName"
                component={TextInput}
                label="Street Number & Name"
                fullWidth
              />
              <Field
                name="alternativeContactPersonDetails.homeAddressDetails.townshipSuburbCityTown"
                component={TextInput}
                label="Township/Suburb/City/Town"
                fullWidth
              />
              <Field
                name="alternativeContactPersonDetails.homeAddressDetails.province"
                component={TextInput}
                label="Province"
                fullWidth
              />
              <Field
                name="alternativeContactPersonDetails.homeAddressDetails.postalCode"
                component={TextInput}
                label="Postal Code"
                fullWidth
              />
              <Field
                name="alternativeContactPersonDetails.homeAddressDetails.country"
                component={TextInput}
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
                name="alternativeContactPersonDetails.postalAddressDetails.postalAddressLine1"
                component={TextInput}
                label="Postal Address Line 1"
                fullWidth
              />
              <Field
                name="alternativeContactPersonDetails.postalAddressDetails.postalAddressLine2"
                component={TextInput}
                label="Postal Address Line 2"
                fullWidth
              />
              <Field
                name="alternativeContactPersonDetails.postalAddressDetails.province"
                component={TextInput}
                label="Province"
                fullWidth
              />
              <Field
                name="alternativeContactPersonDetails.postalAddressDetails.postalCode"
                component={TextInput}
                label="Postal Code"
                fullWidth
              />
              <Field
                name="alternativeContactPersonDetails.postalAddressDetails.country"
                component={TextInput}
                label="Country"
                fullWidth
              />
            </Box>
          </Box>
          {/* Beneficiary Details */}
          <Box mt={3}>
            <Typography color="textPrimary" variant="h4">
              Beneficiary Details
            </Typography>
            <Box mt={2}/>
            <Field
              name="beneficiaryDetails.title"
              label="Title (Mr, Ms, Mrs)"
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
              name="beneficiaryDetails.firstName"
              component={TextInput}
              label="First Name"
              fullWidth
            />
            <Field
              name="beneficiaryDetails.lastName"
              component={TextInput}
              label="Last Name"
              fullWidth
            />
            <Field
              name="beneficiaryDetails.emailAddress"
              component={TextInput}
              label="Email Address"
              fullWidth
            />
            <Field
              name="beneficiaryDetails.telephoneHome"
              component={TextInput}
              label="Telephone (Home)"
              fullWidth
            />
            <Field
              name="beneficiaryDetails.telephoneMobile"
              component={TextInput}
              label="Telephone (Mobile)"
              fullWidth
            />
            <Field
              name="beneficiaryDetails.telephoneWork"
              component={TextInput}
              label="Telephone (Work)"
              fullWidth
            />
            <Field
              name="beneficiaryDetails.splitPercentage"
              component={TextInput}
              label="Split Percentage"
              fullWidth
            />
          </Box>
          {/* Uploads the Supporting Documentation */}
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
                name="bankingDetails.accountProof"
                id="bankingDetails.accountProof"
                style={{display: "none"}}
                onChange={(event) => {
                  bankingDetails.accountProof = event.target.files[0];
                }}
              />
              <label htmlFor="bankingDetails.accountProof">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
              {bankingDetails.accountProof && (
                <Box my={2}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5">
                        {bankingDetails.accountProof.name}
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
                name="bankingDetails.accountProofConsent"
                id="bankingDetails.accountProofConsent"
                style={{display: "none"}}
                multiple
                onChange={(event) => {
                  bankingDetails.accountProofConsent = Array.from(event.target.files);
                }}
              />
              <label htmlFor="bankingDetails.accountProofConsent">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
              {bankingDetails.accountProofConsent.length !== 0 && (
                <Box my={2}>
                  {bankingDetails.accountProofConsent.map((item) => {
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
                name="personalDetails.IdProof"
                id="personalDetails.IdProof"
                style={{display: "none"}}
                onChange={(event) => {
                  personalDetails.IdProof = event.target.files[0];
                }}
              />
              <label htmlFor="personalDetails.IdProof">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
              {personalDetails.IdProof && (
                <Box my={2}>
                  <Card>
                    <CardContent>
                      <Typography variant="h5">
                        {personalDetails.IdProof.name}
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
          {/* Performer Status */}
          <Box mt={3}>
            <Typography color="textPrimary" variant="h4">
              Performer Status
            </Typography>
            <Field
              name="performerStatus"
              options={[
                {
                  key: "alive",
                  label: "Alive",
                },
                {
                  key: "deceased",
                  label: "Deceased",
                },
              ]}
              component={RadioGroupInput}
            />
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
            <Button
              color="primary"
              size="large"
              fullWidth
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

const ManagePerformerForm = () => {
  return <Formik initialValues={initialValues} component={InnerForm} />;
};

export default ManagePerformerForm;
