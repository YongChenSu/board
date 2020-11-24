const db = require("../db");

const commentModel = {
  add: (username, content, cb) => {
    db.query(
      "INSERT INTO comments(username, content) VALUES(?, ?)",
      [username, content],
      (err, results) => {
        if (err) return cb(err);
        cb(null);
      }
    );
  },

  getAll: (cb) => {
    db.query(
      `SELECT U.nickname, C.content, C.id, C.username
      FROM comments AS C
      LEFT JOIN users AS U on U.username = C.username
      ORDER BY C.id DESC
      `,
      (err, results) => {
        if (err) return cb(err);
        cb(null, results);
      }
    );
  },

  delete: (username, id, cb) => {
    db.query(
      `DELETE FROM comments WHERE id = ? AND username = ?`,
      [id, username],
      (err, results) => {
        if (err) return cb(err);
        cb(null, results);
      }
    );
  },
};

module.exports = commentModel;
