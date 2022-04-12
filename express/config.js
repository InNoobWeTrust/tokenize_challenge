/*
=================================
Config
=================================
*/
const API_BASE = 'https://api.binance.com/api/v3/';
const API_ROUTES = {
  books: (symbol) => `ticker/bookTicker${symbol ? `?symbol=${symbol}` : ''}`,
}
const DEFAULT_TOKEN = 'ETHBTC';

const bookApi = () => `${API_BASE}${API_ROUTES.books(DEFAULT_TOKEN)}`;

module.exports = {
  API_BASE,
  API_ROUTES,
  DEFAULT_TOKEN,
  bookApi,
};
