import express from 'express';
import * as ejs from 'ejs';

export var app = express();

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// https://expressjs.com/ja/api.html#app.engine
app.engine('ejs', ejs.renderFile)
app.engine('html', ejs.renderFile)

app.locals.data = {
  items: [
    {name: "<h1>リンゴ</h1>"},
    {name: "<h2>バナナ</h2>"},
    {name: "<h3>スイカ</h3>"}
  ]
};

app.get("/", function (req, res) {
  res.render("index.ejs", app.locals.data);
});

app.get("/html", function (req, res) {
  res.render("./index.html");
});
