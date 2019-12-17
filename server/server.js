const express = require("express");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.join(__dirname, "..", "build")));
app.use(
  cors({
    allowedHeaders: ["sessionId", "Content-Type"],
    exposedHeaders: ["sessionId"],
    origin: [
      "http://localhost:5000",
      "https://sykefravaer-prototype.herokuapp.com/"
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false
  })
);

// ROUTES
app.get("sykmeldinger", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});
