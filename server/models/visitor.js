const mongoose = require("mongoose");

const visitorSchema = mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  suffix: { type: String, required: false },
  ssn: { type: String, required: true },
  dob: { type: Date, required: true },
  organization: { type: String, required: true },
  driversLicenseImage: { type: String, required: true },
  citizenshipImage: { type: String, required: true }
});

module.exports = mongoose.model("Visitor", visitorSchema);

/*
  lastName: string;
  firstName: string;
  middleName?: string;
  suffix: string;
  ssn: number;
  dob: string;
  sex: string;
  citizenship: string;
  prox: string;
  organization: string;
  employer: string;
  clearance: string;
  effective_date: Date;
  expire_date: Date;
  authorizing_official: string;
  comments: string;
  driversLicenseImage: any;
  citizenshipImage: any;
  _id: string;
  */