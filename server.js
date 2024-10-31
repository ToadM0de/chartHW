const path = require("path");
const express = require("express");

const app = require("./api");

app.use(
  express.static(
    path.join(__dirname, "views") //
  )
);
