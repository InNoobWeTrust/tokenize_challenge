/*
=================================
Bookings request
=================================
*/

const https = require('https');
const bookApi = require('./config').bookApi;

const fetch = (api) => new Promise((resolve, reject) => {
    https.get(api, res => {
        let body = '';
        res.on('data', d => {
            body += d;
        });
        res.on('end', () => {
            resolve(JSON.parse(body));
        });
    }).on('error', error => {
        reject(error);
    });
});

const getBooks = async () => {
    const api = bookApi();
    // console.debug(api);
    const res = await fetch(api);
    return res;
}

const getBestBooks = async () => {
    const { bidPrice, bidQty, askPrice, askQty } = await getBooks();
    const bookTable = {
        bidPrice: Number(bidPrice),
        bidQty: Number(bidQty),
        askPrice: Number(askPrice),
        askQty: Number(askQty),
    };
    return bookTable;
}

module.exports = getBestBooks;
