'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const getBestBooks = require('./booking');
const fuzzMarket = require('./fuzz');

const marketFactory = async (numRecords) => {
  const {bidPrice, askPrice} = await getBestBooks();
  const fakeMarket = fuzzMarket(bidPrice, askPrice, numRecords || 10);
  return fakeMarket;
}

// Router for lambda function
const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/echo', (req, res) => res.json(req));
router.post('/', (req, res) => res.json({ postBody: req.body }));
router.get('/booking', async (_req, res) => res.json(await getBestBooks()));

router.get('/market', async (_req, res) => {
  const fakeMarket = await marketFactory();
  res.json(fakeMarket);
})
router.get('/market/:num', async (req, res) => {
  const fakeMarket = await marketFactory(req.params.num);
  res.json(fakeMarket);
})

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);
app.use('/', (_req, res) => res.sendFile(path.join(__dirname, '../static/index.html')));
app.use('', express.static(path.join(__dirname, 'static')));

module.exports = app;
module.exports.handler = serverless(app);

