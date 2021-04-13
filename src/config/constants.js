export const PERFORMER_APPLICANT_TYPES = {
  SUCCESSOR_APPLICANT: {
    key: "SUCCESSOR_APPLICANT",
    label: "Successor Applicant",
  },
  ACTUAL_PERFORMER: {
    key: "ACTUAL_PERFORMER",
    label: "Actual Performer",
  },
};

export const APPLICANT_SUPPORTING_DOCS_MAP = {
  [PERFORMER_APPLICANT_TYPES.ACTUAL_PERFORMER.key]: {
    id: {
      key: "id",
      label: `Identification (RSA ID/Passport)`,
    },
  },
  [PERFORMER_APPLICANT_TYPES.SUCCESSOR_APPLICANT.key]: {
    deceased_performer_id: {
      key: "deceased_performer_id",
      label: `Identification (RSA ID/Passport) of the Deceased Performer`,
    },
    certified_cope_of_death_certificate: {
      key: "certified_cope_of_death_certificate",
      label: "Certified Copy of Death Certificate",
    },
    will_or_letterOfAuthority: {
      key: "will_or_letterOfAuthority",
      label: "Will or Letter of Authority",
    },
    beneficiaries_id: {
      key: "beneficiaries_id",
      label: `Identification (RSA ID/Passport)
      of Beneficiaries`,
    },
  },
};
