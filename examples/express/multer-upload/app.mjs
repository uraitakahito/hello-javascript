import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: 'public/uploads/' });
export var app = express();

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/upload.html'))
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.file.originalname);
  res.send(req.file.originalname + ' Uploaded');
});
