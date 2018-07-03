const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const request = require("request");
const querystring = require("querystring");
require("dotenv").config();

const client_id = "6e3ee6e2ee1740ecb04b03559f11d794";
const client_secret = "b45a5bc5a2684ab3b553101ba2a8fd43";
const redirect_uri = "http://localhost:8888/callback";

// spotify access

// front end

const ctrl = require("./controller");

const port = 3001;

const app = express();
app.use(json());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set("db", db);
});

app.get("/api/posts", ctrl.getAllPosts);

app.listen(port, () => {
  console.log(`Listening on port:3001`);
});
