const express = require('express');
const morgan = require('morgan');
const path = require('path');
const router = require('./router');

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public');
const app = express();
const compression = require('compression');

app.use(morgan('dev'));
app.use(express.static(PUBLIC_DIR));



// Handling asset requests for webpack bundles by passing off requests to the bundles router
app.use('/bundles', router.bundles);
// Handling AJAX requests to the API by passing off requests to the api router
app.use('/api', router.api);

app.use(compression());

app.get('/:item_id', (req, res) => {
  res.sendFile(`${PUBLIC_DIR}/index.html`);
});

module.exports = app;
