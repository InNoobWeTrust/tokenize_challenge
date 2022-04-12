/*
=================================
Bookings request
=================================
*/

import { bookApi } from './config.js';
import fetch from 'node-fetch';

const getBooks = async () => {
    const api = bookApi();
    // console.debug(api);
    const res = await fetch(api);
    return await res.json();
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

export default getBestBooks;
