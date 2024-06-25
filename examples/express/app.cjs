const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const fs = require('fs');
app.use('/static', express.static(path.join(__dirname, 'public')));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
// https://expressjs.com/ja/api.html#express.json
app.use(bodyParser.json());

//
// CORS
//
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
app.use(allowCrossDomain);

app.set('view engine', 'ejs');

app.locals.data = {
  items: [
    {name: "<h1>リンゴ</h1>"},
    {name: "<h2>バナナ</h2>"},
    {name: "<h3>スイカ</h3>"}
  ]
};

app.get('/', (req, res) => {
  // Perform rendering
  res.render("index.ejs", app.locals.data);
});

app.get('/hello-json-1', (req, res, next) => {
  res.json({ message: 'Hello, JSON!' });
});

// curl -X POST \
//   -H "Accept: application/json" \
//   -H "Content-type: application/json" \
//   -d '{"id" : "1", "name" : "foo"}' \
//   http://localhost:3000/hello-json-2
app.post('/hello-json-2', (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(400).json(
      { success: false }
    );
    return;
  }
  res.json({
    success: true,
    id: req.body.id,
    text: req.body.name
  })
});

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/upload.html'))
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file.originalname);
  res.send(req.file.originalname + ' Uploaded');
});

app.get('/error-example-1', (req, res) => {
  throw new Error('Hello Error');
});

app.get('/error-example-2', (req, res, next) => {
  fs.readFile('/file-does-not-exist', (err, data) => {
    if (err) {
      next(err) // Pass errors to Express.
    } else {
      res.send(data)
    }
  })
})

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

module.exports = app;
