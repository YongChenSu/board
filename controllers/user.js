const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {
  login: (req, res) => {
    res.render("login");
  },

  handleLogin: (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      req.flash("errorMessage", "該填的沒填");
      return next();
    }
    userModel.get(username, (err, user) => {
      if (err) {
        req.flash("errorMessage", err.toString());
        return res.redirect("back");
      }
      if (!user) {
        req.flash("errorMessage", "使用者不存在");
        return next();
      }
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash("errorMessage", "密碼錯誤");
          return next();
        }
        req.session.username = user.username;
        res.redirect("/");
      });
    });
  },

  register: (req, res) => {
    res.render("user/register");
  },

  handleRegister: (req, res, next) => {
    const { username, nickname, password } = req.body;
    if (!username || !nickname || !password) {
      req.flash("errorMessage", "缺少必要欄位");
      return next();
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash("errorMessage", err.toString());
        return next();
      }

      userModel.add({ username, nickname, password: hash }, (err) => {
        if (err) {
          req.flash("errorMessage", err.toString());
          return next();
        }
        req.session.username = username;
        res.redirect("/");
      });
    });
  },

  logout: (req, res) => {
    req.session.username = null;
    res.redirect("/");
  },
};
module.exports = userController;
