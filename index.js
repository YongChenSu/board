const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");

const db = require("./db");
const app = express();
const port = 5001;

const todoController = require("./controllers/todo");

app.set("view engine", "ejs");
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// post 的資料就是這個 Content-Type
app.use(bodyParser.urlencoded({ extended: false }));
// JSON 的資料就是這個 Content-Type
app.use(bodyParser.json());
// 給 key-value, 即可設置 key-value 訊息，在其他頁面也可用
app.use(flash());

/* 
  為了不再各個地方寫一樣的東西
  req.locals 裡面的訊息可以直接在 view 裡面拿到
  像是全域變數
*/
// 捷徑：req.locals
app.use((req, res, next) => {
  // 跟這我念一次： req.session, res.locals
  res.locals.isLogin = req.session.isLogin;
  res.locals.errorMessage = req.flash("errorMessage");
  next();
});

app.post("/todos", todoController.newTodo);
app.get("/todos", todoController.getAll);
app.get("/todos/:id", todoController.get);
app.get("/", todoController.addTodo);
app.get("/login", (req, res) => {
  // res.render("login", {
  //   errorMessage: req.flash("errorMessage"),
  // });
  res.render("login");
});
app.post("/login", (req, res) => {
  if (req.body.password === "abc") {
    req.session.isLogin = true;
    res.redirect("/");
  } else {
    req.flash("errorMessage", "Please input correct password");
    res.redirect("/login");
  }
});
app.get("/logout", (req, res) => {
  req.session.isLogin = false;
  res.redirect("/");
});

app.listen(port, () => {
  db.connect();
  console.log(`Example app listening on ${port}`);
});
