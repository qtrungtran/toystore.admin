import React, { useEffect, useMemo } from "react";
// import * as Yup from "yup";
import {
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
  List,
  ListItem,
  ListItemText,
  Collapse,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import {
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";
import CheckboxInput from "components/inputs/CheckboxInput";
import RadioGroupInput from "components/inputs/RadioGroupInput";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TextInput from "components/inputs/TextInput";

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
    IdProof: {name: "aaa.png"}
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
    cmos: "itsRight"
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
    accountProofConsent: [{name: "aaa.png"}],
    accountProof: {name: "aaa.png"}
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
  note: "",
  notes: "",
};

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

const InnerForm = ({ values, setValues, setFieldValue, ...rest }) => {
  const {
    performerApplicantType,
    personalDetails,
    contactDetails,
    homeAddressDetails,
    postalAddressDetails,
    mandateDetails,
    bankingDetails,
    alternativeContactPersonDetails,
    beneficiaryDetails,
  } = values;
  const requiredDocuments = useMemo(() => {
    const docs = APPLICANT_SUPPORTING_DOCS_MAP[performerApplicantType] || {};
    return Object.values(docs);
  }, [performerApplicantType]);
  const CMOs = {
    AIE: "AIE",
    CGA: "CGA",
    CPRA: "CPRA",
    GDA: "GDA",
    itsRight: "ItsRight",
    playRight: "PlayRight",
    PPL: "PPL",
    SAMI: "SAMI",
    SENA: "SENA"
  };

  useEffect(() => {
    const initialRequiredDocValues = Object.values(
      APPLICANT_SUPPORTING_DOCS_MAP[performerApplicantType] || []
    ).reduce((value, { key }) => {
      return Object.assign(value, { [key]: true });
    }, {});
    setFieldValue("requiredDocs", initialRequiredDocValues);
  }, [performerApplicantType, setFieldValue]);

  const [openPerformerApplicantType, setOpenPerformerApplicantType] = React.useState(false);
  const [openPerformerDetails, setOpenPerformerDetails] = React.useState(false);
  const [openContactDetails, setOpenContactDetails] = React.useState(false);
  const [openHomeAddressDetails, setOpenHomeAddressDetails] = React.useState(false);
  const [openPostalAddressDetails, setOpenPostalAddressDetails] = React.useState(false);
  const [openMandateDetails, setOpenMandateDetails] = React.useState(false);
  const [openBankingDetails, setOpenBankingDetails] = React.useState(false);
  const [openAlternativeContactPersonDetails, setOpenAlternativeContactPersonDetails] = React.useState(false);
  const [openBeneficiaryDetails, setOpenBeneficiaryDetails] = React.useState(false);

  const performerApplicantTypeHandleClick = () => {
    setOpenPerformerApplicantType(!openPerformerApplicantType);
  };
  const performerDetailsHandleClick = () => {
    setOpenPerformerDetails(!openPerformerDetails);
  };
  const contactDetailsHandleClick = () => {
    setOpenContactDetails(!openContactDetails);
  };
  const homeAddressDetailsHandleClick = () => {
    setOpenHomeAddressDetails(!openHomeAddressDetails);
  };
  const postalAddressDetailsHandleClick = () => {
    setOpenPostalAddressDetails(!openPostalAddressDetails);
  };
  const mandateDetailsHandleClick = () => {
    setOpenMandateDetails(!openMandateDetails);
  };
  const bankingDetailsHandleClick = () => {
    setOpenBankingDetails(!openBankingDetails);
  };
  const alternativeContactPersonDetailsHandleClick = () => {
    setOpenAlternativeContactPersonDetails(!openAlternativeContactPersonDetails);
  };
  const beneficiaryDetailsHandleClick = () => {
    setOpenBeneficiaryDetails(!openBeneficiaryDetails);
  };

  return (
    <Container maxWidth="sm">
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Form>
          <Box mb={2}>
            <Typography color="textPrimary" variant="h1">
              Review Performer Details
            </Typography>
          </Box>
          <List>
          {/* Supporting Documentation */}
          <ListItem>
            <ListItemText>
              <Typography color="textPrimary" variant="h4">
                Supporting Documentation
              </Typography>
            </ListItemText>
          </ListItem>
          <Box>
            <Box ml={3}>
              <Typography>
                Account Proof File
              </Typography>
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
            <Box mt={1} ml={3}>
              <Typography>
                Account Proof Consent Files
              </Typography>
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
            <Box mt={1} ml={3}>
              <Typography>
                Id Proof File
              </Typography>
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
          {/* Performer Type */}
          <ListItem button onClick={performerApplicantTypeHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
              Performer Applicant Type
            </Typography>
          </ListItemText>
            {openPerformerApplicantType ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPerformerApplicantType} timeout="auto" unmountOnExit>
            {!isEmpty(requiredDocuments) && (
              <Box ml={3}>
                <Typography color="textPrimary" variant="h6">
                  {performerApplicantType === "ACTUAL_PERFORMER" ? "Actual Performer" : "Successor Applicant"}
                </Typography>
                <Box ml={2}>
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
              </Box>
            )}
          </Collapse>
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
                  <ListItemText
                    primary={personalDetails.identificationType === "rsa_id" ? "RSA ID" : "Passport"}
                    secondary={personalDetails.rsa_id_number}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="First Name" secondary={personalDetails.firstName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Last Name" secondary={personalDetails.lastName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Date of Birth" secondary={personalDetails.birthDate} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Passport Expiry Date" secondary={personalDetails.passportExpiryDate} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Gender" secondary={personalDetails.gender === "male" ? "Male" : "Female"} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Country of Birth" secondary={personalDetails.countryOfBirth} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Country of Residence" secondary={personalDetails.countryOfResidence} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="IPN Number" secondary={personalDetails.IPNNumber} />
                </ListItem>
              </List>
            </Box>
          </Collapse>
          {/* Contact Details */}
          <ListItem button onClick={contactDetailsHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
              Contact Details
            </Typography>
          </ListItemText>
            {openContactDetails ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openContactDetails} timeout="auto" unmountOnExit>
            <Box ml={1}>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText primary="Email Address" secondary={contactDetails.emailAddress} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Telephone (Home)" secondary={contactDetails.telephoneHome} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Telephone (Mobile)" secondary={contactDetails.telephoneMobile} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Telephone (Work)" secondary={contactDetails.telephoneWork} />
                </ListItem>
              </List>
            </Box>
          </Collapse>
          {/* Home Address Details */}
          <ListItem button onClick={homeAddressDetailsHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
              Home Address Details
            </Typography>
          </ListItemText>
            {openHomeAddressDetails ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openHomeAddressDetails} timeout="auto" unmountOnExit>
            <Box ml={1}>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText primary="Street Number & Name" secondary={homeAddressDetails.streetNumberAndName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Township/Suburb/City/Town" secondary={homeAddressDetails.townshipSuburbCityTown} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Province" secondary={homeAddressDetails.province} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Postal Code" secondary={homeAddressDetails.postalCode} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Country" secondary={homeAddressDetails.country} />
                </ListItem>
              </List>
            </Box>
          </Collapse>
          {/* Postal Address Details */}
          <ListItem button onClick={postalAddressDetailsHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
              Postal Address Details
            </Typography>
          </ListItemText>
            {openPostalAddressDetails ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openPostalAddressDetails} timeout="auto" unmountOnExit>
            <Box ml={1}>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText primary="Postal Address Line 1" secondary={postalAddressDetails.postalAddressLine1} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Postal Address Line 2" secondary={postalAddressDetails.postalAddressLine2} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Province" secondary={postalAddressDetails.province} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Postal Code" secondary={postalAddressDetails.postalCode} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Country" secondary={postalAddressDetails.country} />
                </ListItem>
              </List>
            </Box>
          </Collapse>
          {/* Mandate Details */}
          <ListItem button onClick={mandateDetailsHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
              Mandate Details
            </Typography>
          </ListItemText>
            {openMandateDetails ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openMandateDetails} timeout="auto" unmountOnExit>
            <Box ml={1}>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText primary="Mandate Indicator" secondary={mandateDetails.mandateIndicator === "worldwide" ? "Worldwide" : "South Africa and Africa"} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Member of Neighbouring Rights CMOs in other countries?" secondary={mandateDetails.memberOfNeighbouringRightsCMOsInOtherCountries === "yes" ? "Yes" : "No"} />
                </ListItem>
                {get(values, `mandateDetails.memberOfNeighbouringRightsCMOsInOtherCountries`) ===
                "yes" && (
                  // <Box ml={2}>
                  //   <ListItem>
                  //     <ListItemText primary="AIE" secondary={mandateDetails.AIE} />
                  //   </ListItem>
                  //   <ListItem>
                  //     <ListItemText primary="CGA" secondary={mandateDetails.CGA} />
                  //   </ListItem>
                  //   <ListItem>
                  //     <ListItemText primary="CPRA" secondary={mandateDetails.CPRA} />
                  //   </ListItem>
                  //   <ListItem>
                  //     <ListItemText primary="GDA" secondary={mandateDetails.GDA} />
                  //   </ListItem>
                  //   <ListItem>
                  //     <ListItemText primary="ItsRight" secondary={mandateDetails.itsRight} />
                  //   </ListItem>
                  //   <ListItem>
                  //     <ListItemText primary="PlayRight" secondary={mandateDetails.playRight} />
                  //   </ListItem>
                  //   <ListItem>
                  //     <ListItemText primary="PPL" secondary={mandateDetails.PPL} />
                  //   </ListItem>
                  //   <ListItem>
                  //     <ListItemText primary="SAMI" secondary={mandateDetails.SAMI} />
                  //   </ListItem>
                  //   <ListItem>
                  //     <ListItemText primary="SENA" secondary={mandateDetails.SENA} />
                  //   </ListItem>
                  // </Box>
                  <Box ml={2}>
                    <ListItem>
                      <ListItemText primary={CMOs[mandateDetails.cmos]}/>
                    </ListItem>
                  </Box>
                )}
              </List>
            </Box>
          </Collapse>
          {/* Banking Details */}
          <ListItem button onClick={bankingDetailsHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
              Banking Details
            </Typography>
          </ListItemText>
            {openBankingDetails ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBankingDetails} timeout="auto" unmountOnExit>
            <Box ml={3}>
              <Typography color="textPrimary" variant="h6">
                Type: {bankingDetails.bankingType === "own" ? "Own" : "3rd Party"}
              </Typography>
              {get(values, `bankingDetails.bankingType`) ===
                "own" && (
                  <Box ml={2}>
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
            <Box ml={1}>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText primary="Account Holder" secondary={bankingDetails.accountHolder} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Bank Name" secondary={bankingDetails.bankName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Branch Code" secondary={bankingDetails.branchCode} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Account Type" secondary={bankingDetails.accountType} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Account Number" secondary={bankingDetails.accountNumber} />
                </ListItem>
              </List>
            </Box>
          </Collapse>
          {/* Alternative Contact Person Details */}
          <ListItem button onClick={alternativeContactPersonDetailsHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
              Alternative Contact Person Details
            </Typography>
          </ListItemText>
            {openAlternativeContactPersonDetails ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openAlternativeContactPersonDetails} timeout="auto" unmountOnExit>
            <Box ml={1}>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Title (Mr, Ms, Mrs)"
                    secondary={alternativeContactPersonDetails.title === "mr"
                      ? "Mr"
                      : alternativeContactPersonDetails.title === "ms" ? "Ms" : "Mrs"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="First Name" secondary={alternativeContactPersonDetails.firstName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Last Name" secondary={alternativeContactPersonDetails.lastName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Relationship to Applicant" secondary={alternativeContactPersonDetails.relationshipToApplicant} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email Address" secondary={alternativeContactPersonDetails.emailAddress} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Telephone (Home)" secondary={alternativeContactPersonDetails.telephoneHome} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Telephone (Mobile)" secondary={alternativeContactPersonDetails.telephoneMobile} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Telephone (Work)" secondary={alternativeContactPersonDetails.telephoneWork} />
                </ListItem>
                <ListItem>
                  <Typography color="textPrimary" variant="h5">
                    Home Address Details
                  </Typography>
                </ListItem>
                <Box ml={2}>
                  <ListItem>
                    <ListItemText primary="Street Number & Name" secondary={alternativeContactPersonDetails.homeAddressDetails.streetNumberAndName} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Township/Suburb/City/Town" secondary={alternativeContactPersonDetails.homeAddressDetails.townshipSuburbCityTown} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Province" secondary={alternativeContactPersonDetails.homeAddressDetails.streetNumberAndName.province} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Postal Code" secondary={alternativeContactPersonDetails.homeAddressDetails.postalCode} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Country" secondary={alternativeContactPersonDetails.homeAddressDetails.country} />
                  </ListItem>
                </Box>
                <ListItem>
                  <Typography color="textPrimary" variant="h5">
                    Postal Address Details
                  </Typography>
                </ListItem>
                <Box ml={2}>
                  <ListItem>
                    <ListItemText primary="Postal Address Line 1" secondary={alternativeContactPersonDetails.postalAddressDetails.postalAddressLine1} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Postal Address Line 2" secondary={alternativeContactPersonDetails.postalAddressDetails.postalAddressLine2} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Province" secondary={alternativeContactPersonDetails.postalAddressDetails.province} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Postal Code" secondary={alternativeContactPersonDetails.postalAddressDetails.postalCode} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Country" secondary={alternativeContactPersonDetails.postalAddressDetails.country} />
                  </ListItem>
                </Box>
              </List>
            </Box>
          </Collapse>
          {/* Beneficiary Details */}
          <ListItem button onClick={beneficiaryDetailsHandleClick}>
          <ListItemText>
            <Typography color="textPrimary" variant="h4">
              Beneficiary Details
            </Typography>
          </ListItemText>
            {openBeneficiaryDetails ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBeneficiaryDetails} timeout="auto" unmountOnExit>
            <Box ml={1}>
              <List component="div" disablePadding>
                <ListItem>
                  <ListItemText
                    primary="Title (Mr, Ms, Mrs)"
                    secondary={beneficiaryDetails.title === "mr"
                      ? "Mr"
                      : beneficiaryDetails.title === "ms" ? "Ms" : "Mrs"
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText primary="First Name" secondary={beneficiaryDetails.firstName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Last Name" secondary={beneficiaryDetails.lastName} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Email Address" secondary={beneficiaryDetails.emailAddress} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Telephone (Home)" secondary={beneficiaryDetails.telephoneHome} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Telephone (Mobile)" secondary={beneficiaryDetails.telephoneMobile} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Telephone (Work)" secondary={beneficiaryDetails.telephoneWork} />
                </ListItem>
                <ListItem>
                  <ListItemText primary="Split Percentage" secondary={beneficiaryDetails.splitPercentage} />
                </ListItem>
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

const ReviewPerformerForm = () => {
  return <Formik initialValues={initialValues} component={InnerForm} />;
};

export default ReviewPerformerForm;
