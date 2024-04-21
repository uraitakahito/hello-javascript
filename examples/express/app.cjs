const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' });
app.use(express.static(path.join(__dirname, 'public')))

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
