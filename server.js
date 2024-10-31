const path = require("path");
const express = require("express");

const app = require("./api");

app.use(
  express.static(
    path.join(__dirname, "views") //
  )
);

const port = process.env.PORT || 8114;
app.listen(port);

console.log(`http://localhost:${port}`);

module.exports = app;
