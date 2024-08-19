// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/
import { app } from './app.js';
const port = 3000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
