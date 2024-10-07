import express from 'express';
import url from 'node:url';
import path from 'node:path';

import { db } from './database/index.js';
import { router } from './routes/index.js';
import { log } from './utils.js';

const PORT = process.env.PORT;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const app = express();

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
app.use((req, res) => res.redirect('/home'));

app.use((err, req, res, next) => {
  log(err.stack);
  res.status(500).send('Something went wrong!');
})

app.listen(PORT, () => log(`Server started on ${PORT} port`));

const gracefulShutdown = (err) => {
  db.close();

  if (!err instanceof Error) {
    return app.close(() => process.exit(0));
  }

  if (err.stack) {
    log(err.stack);
  }

  process.exit(1);
}
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

process.on('uncaughtException', gracefulShutdown);
process.on('unhandledRejection', gracefulShutdown);