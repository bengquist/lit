require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const request = require("request");
const querystring = require("querystring");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const session = require("express-session");

const ctrl = require("./controller");

const port = 3001;

const app = express();
app.use(json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 7 * 24 * 60 * 60 * 1000
    }
  })
);

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});

// posts
app.get("/api/posts", ctrl.getAllPosts);
app.post("/api/profileposts", ctrl.addToProfile);
app.delete("/api/profilepost/:id", ctrl.deleteFromProfile);
app.put("/api/profilepost/:id", ctrl.editProfilePost);

//users
app.post("/api/users", ctrl.addUser);

app.listen(port, () => {
  console.log(`Listening on port:3001`);
});
