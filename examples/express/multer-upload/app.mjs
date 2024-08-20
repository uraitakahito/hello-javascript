import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const updir = path.join(__dirname, 'public/uploads/');
const upload = multer({ dest: updir });
export var app = express();

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/upload.html'))
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file.originalname);

  const path = req.file.path.replace(/\\/g, "/")
  const dest = updir + req.file.originalname;
  fs.renameSync(path, dest);
  res.send(dest + ' Uploaded');
});
