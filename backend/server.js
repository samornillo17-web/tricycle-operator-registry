require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const tricycleRoutes =
  require("./routes/tricycleRoutes");


const app = express();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());


// ==========================================
// API ROUTES
// ==========================================

app.use(
  "/api/tricycles",
  tricycleRoutes
);


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {

  res.json({
    message:
      "Tricycle Operator Registry API is running."
  });

});


// ==========================================
// MONGODB CONNECTION
// ==========================================

const PORT =
  process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI;


if (!MONGO_URI) {

  console.error(
    "ERROR: MONGO_URI is not defined in .env"
  );

  process.exit(1);
}


mongoose
  .connect(MONGO_URI)
  .then(() => {

    console.log(
      "MongoDB connected successfully."
    );


    app.listen(
      PORT,
      () => {

        console.log(
          `Server running at http://localhost:${PORT}`
        );

      }
    );

  })
  .catch((error) => {

    console.error(
      "MongoDB connection failed:"
    );

    console.error(error);

    process.exit(1);
  });