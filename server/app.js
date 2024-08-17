const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const ErrorHandler = require("./Utils/errorHandler");

const songRouter = require("./Router/songRoute");



app.use(express.json());

app.use(cors());
// Test API
app.get("/api/test", (req, res) => {
    res.json({ message: "Hello, songs!" });
});

// 

app.use("/api/v1/songs", songRouter);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({
        path: ".env",
    });
}


// Error handling
app.use(ErrorHandler);

module.exports = app;