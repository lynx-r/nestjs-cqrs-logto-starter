const fs = require("fs");
const https = require("https");
const express = require("express");

const app = express();

// Load the HTTPS certificate and key
const options = {
  key: fs.readFileSync("localhost.test-key.pem"),
  cert: fs.readFileSync("localhost.test.pem"),
};

app.get("/", (_req, res) => {
  res.send("Hello, secure world!");
});

// Start HTTPS server
https.createServer(options, app).listen(443);
