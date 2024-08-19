// https://www.grepper.com/answers/218377/express+bodyparser+deprecated
import express from 'express';

export var app = express();

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  var msg = 'Input your message';
  res.render('index.ejs',
  {
    title: 'Index',
    content: msg,
  });
});

// curl -X POST -d 'message=foo' http://localhost:3000/
app.post('/', (req, res) => {
  var msg = req.body.message;
  res.render('index.ejs',
    {
      title: 'Posted',
      content: msg,
    });
});
