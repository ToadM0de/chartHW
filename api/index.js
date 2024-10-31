const express = require("express");

const app = express();

app.use(express.json());

const crittersFound = [
  "frog",
  "frog",
  "rat",
  "weevil",
  "beetle",
  "beetle",
  "beetle",
  "beetle",
  "beetle",
  "beetle",
  "beetle",
  "beetle",
  "beetle",
];

app.get("/api/crittersFound", function (req, res) {
  res.status(200).json({ crittersFound: crittersFound });
});

app.post("/api/crittersFound/new", function (req, res) {
  crittersFound.push(req.body.crittersName);
  res.status(200).json({ crittersFound: crittersFound });
});

app.get("/api/crittersFound", function (req, res) {
  res.status(200).json({ crittersFound: crittersFound });
});

app.delete("/api/crittersFound", function (req, res) {
  crittersFound.splice(req.body.crittersName);
  res.status(200).json({ crittersFound: crittersFound });
});

const port = process.env.PORT || 8114;
app.listen(port);

console.log(`http://localhost:${port}`);

module.exports = app;
