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

app.use(passport.initialize());
app.use(passport.session());
passport.use(
  new Auth0Strategy(
    {
      domain: process.env.DOMAIN,
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/login",
      scope: "openid email profile"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, {
    clientID: user.id,
    email: user._json.email,
    name: user._json.name
  });
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/students",
    failureRedirect: "/login",
    connection: "github"
  })
);

function authenticated(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});

app.get("/api/posts", ctrl.getAllPosts);
app.post("/api/profileposts", ctrl.addToProfile);
app.delete("/api/profilepost/:id", ctrl.deleteFromProfile);
app.put("/api/profilepost/:id", ctrl.editProfilePost);

app.listen(port, () => {
  console.log(`Listening on port:3001`);
});
