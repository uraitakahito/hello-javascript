const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const fs = require('fs');
app.use('/static', express.static(path.join(__dirname, 'public')));

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
