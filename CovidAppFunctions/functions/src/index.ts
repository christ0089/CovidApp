import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

admin.initializeApp({
  storageBucket: "tenmas-d09fd.appspot.com",
});
const path = require("path");
const os = require("os");
const fs = require("fs");

const express = require("express");
const cors = require("cors");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));


exports.creditAuthorize = functions.https.onCall(async (data, context) => {
  // When credit is authorized
  const auth = context.auth?.uid as string;
  let result = {};
  console.log(data);
  const t = new Date();

  const payments: any[] = Array(data.Months)
    .fill(null)
    .map((i, e) => {
      const _date = new Date(t.getFullYear(), t.getMonth() + e, 0, 23, 59, 59);
      return { payment: 0, date: _date, completed: false };
    });

  const userObject = {
    currentBalance: data.ApprovedCredit,
    payments: payments,
    activated: true,
    ApprovedCredit: data.ApprovedCredit,
  };
  console.log(userObject);
  await admin
    .firestore()
    .collection("Active_Users")
    .doc(auth)
    .update(Object.assign({}, userObject))
    .then(() => {
      result = { success: 200, status: "Se ha creado el credito" };
    })
    .catch((e) => {
      result = { success: 400, status: e };
    });
  return result;
});



exports.validateUser = functions.auth.user().onCreate((user, context) => {
  // Send Thankyou Email
});

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


