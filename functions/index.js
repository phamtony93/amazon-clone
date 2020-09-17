const functions = require("firebase-functions");
// nodeJS does not have import functionality prebuilt
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51HRtvKL0MubunR6nOVZCJ8p3H0jX4BQDl9Nio9eNwZshnItb3RmwvUkWOhBLzjwMCiIVwwZ9TI7pnEpJkJV6YGfS00LcRBT0cK"
);

// API

// - App Config
const app = express();

// - Middlewares
app.use(cors({ origin: true }));
app.use(express.json());
// - API routes
app.get("/", (request, response) => {
  response.status(200).send("hello world");
});

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request received for this amount ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen Command
exports.api = functions.https.onRequest(app);

// run below command to deploy only the firebase cloud function
//firebase deploy --only functions

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
