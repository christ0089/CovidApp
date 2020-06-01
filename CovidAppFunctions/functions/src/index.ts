import * as functions from "firebase-functions";

import * as admin from "firebase-admin";


const express = require("express");
const cors = require("cors");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));


admin.initializeApp();


// import * as firebaseFunctions from "./firebaseFunctions";
// import config from "./config";

// import getHandshakePin from "./opentrace/getHandshakePin";
// import getTempIDs from "./opentrace/getTempIDs";
// import getUploadToken from "./opentrace/getUploadToken";
// import processUploadedData from "./opentrace/processUploadedData";

// // exports.getHandshakePin = firebaseFunctions.https(getHandshakePin);
// // exports.getTempIDs = firebaseFunctions.https(getTempIDs);
// // exports.getUploadToken = firebaseFunctions.https(getUploadToken);
// // exports.processUploadedData = firebaseFunctions.storage(config.upload.bucket, processUploadedData);

// Creates user if it exists in the database.
exports.userValidate = functions.https.onCall(async (data) => {


  const user = admin.auth().createUser({
    phoneNumber: data.phone,
    displayName: `${data.name} ${data.lname}`,
    photoURL: "http://www.example.com/12345678/photo.png",
    email: data.email,
    disabled: false,
  });
  let result = null;


  await Promise.resolve(user)
    .then(() => {
      result = { success: 200, status: "El usuario se ha creado" };
    })
    .catch((e) => {
      console.error(e);
      result = { success: 400, status: e };
    });

  return result;
});


