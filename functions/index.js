const functions = require("firebase-functions");
const admin = require("firebase-admin");
var moment = require("moment");

var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rn-login-e18c3-default-rtdb.firebaseio.com",
});

const express = require("express");
const app = express();
const db = admin.firestore();

const cors = require("cors");
//var datetime = new Date();
//datetime.toString(),
app.use(cors({ origin: true }));

//Routes
app.post("/api/create", (req, res) => {
  (async () => {
    try {
      await db.collection("failureHistory").doc().create({
        Date: req.body.Date,
        Location: req.body.Location,
      });
      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

//Create
//Post

//Read
//Get

//Update
//Put

/* app.patch("/api/update/:id", (req, res) => {
  (async () => {
    try {
      const document = db.collection("signals").doc(req.params.id);

      await document.update({
        name: req.body.name,
        value: req.body.value,
      });

      return res.status(200).send();
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
}); */

//Delete

//Export the api to Firebase cloud functions

exports.app = functions.https.onRequest(app);
