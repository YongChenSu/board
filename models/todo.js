const db = require("../db");

const todoModel = {
  getAll: (cb) => {
    db.query("SELECT * from todos", (err, results) => {
      if (err) return cb(err);
      cb(null, results);
    });
  },

  get: (id, cb) => {
    db.query("SELECT * from todos where id = ?", [id], (err, results) => {
      if (err) return cb(err);
      cb(null, results);
    });
  },
};

module.exports = todoModel;
