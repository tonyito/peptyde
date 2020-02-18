const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist'); 
const HTML_FILE = path.join(DIST_DIR, 'index.html'); // NEW
const apiRouter = require('./routes/api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));


app.use('/api', apiRouter);


app.get('/', (req, res) => {
 res.sendFile(HTML_FILE); 
});
app.use((req, res) => res.sendFile(HTML_FILE));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, function () {
 console.log('App listening on port: ' + port);
});