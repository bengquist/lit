require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const request = require("request");
const querystring = require("querystring");
const passport = require("passport");
const Auth0Strategy = require("passport-auth0");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const ctrl = require("./controller");

const port = 3001;
const client_id = process.env.CLIENT_ID || "6e3ee6e2ee1740ecb04b03559f11d794"; // Your client id
const client_secret =
  process.env.CLIENT_SECRET || "b45a5bc5a2684ab3b553101ba2a8fd43"; // Your secret
const redirect_uri = "http://localhost:3001/callback"; // Or Your redirect uri

let generateRandomString = function(length) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

let stateKey = "spotify_auth_state";

const app = express();
app.use(json());

app.use(express.static(__dirname + "/public")).use(cookieParser());
app.use(cors());

app.get("/login", function(req, res) {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  let scope = "user-read-private user-read-email user-read-playback-state";
  console.log("yoooooooo");
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
  );
});

app.get("/callback", function(req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  let code = req.query.code || null;
  let state = req.query.state || null;
  let storedState = req.cookies ? req.cookies[stateKey] : null;
  let name = "";
  let email = "";
  let profile_img = "";

  if (state === null || state !== storedState) {
    res.redirect(
      "/#" +
        querystring.stringify({
          error: "state_mismatch"
        })
    );
  } else {
    res.clearCookie(stateKey);
    let authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code"
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64")
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        let access_token = body.access_token,
          refresh_token = body.refresh_token;

        let options = {
          url: "https://api.spotify.com/v1/me",
          headers: { Authorization: "Bearer " + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          name = body.display_name;
          email = body.email;
          profile_img = body.images[0].url;
          res.redirect(
            "http://localhost:3000/#" +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token,
                name: name,
                email: email,
                profile_img:
                  profile_img ||
                  "http://ebus.ca/wp-content/uploads/2017/08/profile-placeholder.jpg"
              })
          );
        });
      } else {
        res.redirect(
          "/#" +
            querystring.stringify({
              error: "invalid_token"
            })
        );
      }
    });
  }
});

app.get("/refresh_token", function(req, res) {
  // requesting access token from refresh token
  let refresh_token = req.query.refresh_token;
  let authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      let access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});

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
