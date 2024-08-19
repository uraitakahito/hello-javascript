// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

export var app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => {
  res.send(__dirname);
});
