const express = require("express");
const router = express.Router();
const Visitor = require("../models/visitor");
const fs = require("fs");
const path = require("path");
const util = require("util");
const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

// Multer image storage information
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("ADD POST", file)
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error,"server/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

function deleteImagesById(id) {
  var imagePaths = [];

  Visitor.findById(id).then(visitor => {
    console.log(util.inspect(visitor))
    imagePaths.push(path.join(__dirname, "/..", new URL(visitor.driversLicenseImage).pathname));
    imagePaths.push(path.join(__dirname, "/..", new URL(visitor.citizenshipImage).pathname));

    imagePaths.forEach(path => {
      fs.unlink(path, err => {
        console.log("DELETE", path)
        if (err) {
          global.logger.log({
            level: 'error',
            message: 'Error deleting image: ' + err
          });
        }
      });
    });
  });
}

// ROUTES
router.post(
  "/api/add",
  multer({storage: storage}).array("image", 2),
  (req, res, next) => {
    console.log(util.inspect(req.files));
    const url = req.protocol + "://" + req.get("host");
    const visitor = new Visitor({
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      ssn: req.body.ssn,
      suffix: req.body.suffix,
      organization: req.body.organization,
      driversLicenseImage: url + "/images/" + req.files[0].filename,
      citizenshipImage: url + "/images/" + req.files[1].filename,
    });

    // if visitor already exists reject addition
    Visitor.findOne(
      { ssn: req.body.ssn },
      (err, record) => {
        if (err) {
          res.status(409).json({ success: false, message: err });
          return;
        }
        if (record) {
          if (record.ssn == visitor.ssn) {
            res
              .status(409)
              .json({ success: false, message: "visitor already exists" });
            return;
          }
        }
      });

    visitor.save().then(createdVisitor => {
      res.status(201).json({
        message: "Visitor added successfully",
        visitor: {
          ...createdVisitor,
          _id: createdVisitor._id
        }
      });
    });
  }
);

router.get("/api/all", (req, res, next) => {
  Visitor.find((err, documents) => {
    if (err) {
      res.status(409).json({ success: false, message: err });
    }
    res.status(200).json({
      message: "Visitors fetched successfully!",
      data: documents,
      success: true
    });
  });
});

router.delete("/api/:id", (req, res, next) => {
  deleteImagesById(req.params.id);
  Visitor.deleteOne({ _id: req.params.id }).then(err => {
    res.status(200).json({ success: true, message: "visitor deleted!" });
  });
});


router.get("/api/:id", (req, res, next) => {
  Visitor.findById(req.params.id).then(visitor => {
    if (visitor) {
      console.log("Found visitor: " + visitor.lastName)
      return res.status(200).json(visitor);
    } else {
      console.error("Visitor not found")
      return res.status(404).send({success: false, message: "Visitor not found"});
    }
  })
});

router.put("/api/:id",
  multer({storage: storage}).array("image", 2),
  (req, res, next) => {
    console.log(util.inspect(req.body));
    let citizenshipImage = req.body.citizenshipImage;
    let driversLicenseImage = req.body.citizenshipImage;
    if (req.files) {
      deleteImagesById(req.params.id);
      const url = req.protocol + "://" + req.get("host");
      driversLicenseImage = url + "/images/" + req.files[0].filename;
      citizenshipImage = url + "/images/" + req.files[1].filename;
    }
    const visitor = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      ssn: req.body.ssn,
      suffix: req.body.suffix,
      organization: req.body.organization,
      driversLicenseImage: driversLicenseImage,
      citizenshipImage: citizenshipImage,
      _id: req.body._id
   };
   console.log(util.inspect(visitor));

  Visitor.updateOne({_id: req.params.id}, visitor).then(result => {
      global.logger.log({
        level: 'info',
        message: 'Updated Visitor: ' + req.params.id
      });
      return res.status(200).json(result);
  }).catch(err => console.log(err));
});


module.exports = router;