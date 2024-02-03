const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs');

app.locals.data = {
  items: [
    {name: "<h1>リンゴ</h1>"},
    {name: "<h2>バナナ</h2>"},
    {name: "<h3>スイカ</h3>"}
  ]
};

app.get('/', (req, res) => {
  // レンダリングを行う
  res.render("index.ejs", app.locals.data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
