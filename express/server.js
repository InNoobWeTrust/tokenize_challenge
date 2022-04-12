'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const getBestBooks = require('./booking');
const fuzzMarket = require('./fuzz');

// Router for lambda function
const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/echo', (req, res) => res.json(req));
router.post('/', (req, res) => res.json({ postBody: req.body }));
router.get('/booking', async (req, res) => res.json(await getBestBooks()));
router.get('/booking', async (req, res) => res.json(await getBestBooks()));
router.get('/market/:num', async (req, res) => {
  const {bidPrice, askPrice} = await getBestBooks();
  const fakeMarket = fuzzMarket(bidPrice, askPrice, req.params.num || 10);
  res.json(fakeMarket);
})

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);

