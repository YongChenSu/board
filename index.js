const express = require("express");
const db = require("./db");
const app = express();
const port = 5001;
const todoController = require("./controllers/todo");

app.set("view engine", "ejs");

const checkPermission = (req, res, next) => {
  return req.query.admin === "1" ? next() : res.end("Err");
};

app.get("/todos", checkPermission, todoController.getAll);

app.get("/todos/:id", todoController.get);

app.get("/test", (req, res) => {
  const query = req.query;
  console.log(query);
});

app.listen(port, () => {
  db.connect();
  console.log(`Example app listening on ${port}`);
});
