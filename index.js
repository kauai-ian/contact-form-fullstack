const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// file path
const buildPath = path.normalize(path.join(__dirname, "./frontend/dist"));
app.use(express.static(buildPath));

// body-parser used to get the body from the post request w/o chunking
app.use(bodyParser.json());

// serve up the html
app.get("/", (req, res, next) => {
  console.log("Here");
  res.sendFile(path.join(__dirname, "./frontend", "dist", "index.html"));
});

// Route to handle form submission
app.post("/submit-form", (req, res) => {
  const { name, email, message } = req.body;
  console.log("form submitted: ", { name, email, message });
  // responds w/ message &  data
  res.send({ message: "Successfully submitted", data: req.body });
});

// listen on the port
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
