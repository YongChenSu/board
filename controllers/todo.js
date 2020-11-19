const todoModel = require("../models/todo");

const todoController = {
  getAll: (req, res) => {
    todoModel.getAll((err, results) => {
      if (err) return console.log(err);
      res.render("todos", {
        todos: results,
      });
    });
  },

  get: (req, res) => {
    const id = req.params.id;
    todoModel.get(id, (err, results) => {
      res.render("todo", {
        todo: results[0],
      });
    });
  },
};

module.exports = todoController;
