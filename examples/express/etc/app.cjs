const express = require('express')
const app = express()
const path = require('path')
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const fs = require('fs');
app.use('/static', express.static(path.join(__dirname, 'public')));

//
// CORS
//
const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};
app.use(allowCrossDomain);

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
