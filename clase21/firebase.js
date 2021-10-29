const admin = require("firebase-admin");
const serviceAccount = require("./nodejs-85a51-firebase-adminsdk-egp8g-be0f937a41.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nodejs-85a51.com",
});

const db = admin.firestore();
const query = db.collection("productos");

module.exports = {
  query,
};
