/*
=================================
Config
=================================
*/
export const API_BASE = 'https://api.binance.com/api/v3/';
export const API_ROUTES = {
  books: (symbol) => `ticker/bookTicker${symbol ? `?symbol=${symbol}` : ''}`,
}
export const DEFAULT_TOKEN = 'ETHBTC';

export const bookApi = () => `${API_BASE}${API_ROUTES.books(DEFAULT_TOKEN)}`;
