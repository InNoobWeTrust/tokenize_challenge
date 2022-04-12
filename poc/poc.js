(async () => {
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
    /*
    =================================
    Bookings request
    =================================
    */
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
    /*
    =================================
    Orders fuzz
    =================================
    */
    const fuzzGap = () => 1e-4 * (1 + Math.random());
    const fuzzSize = () => Math.random() >= 0.5 ? (10 * Math.random() + Math.random()) : Math.random();
    const fuzzOffset = (step, balance) => {
        if (balance == 0) {
            // Base case
            const direction = Math.random() >= 0.5 ? 1 : -1;
            return direction * step * Math.random();
        }
        return balance * Math.random();
    }
    const fuzzPrices = (from, to, num) => {
        // Generate prices using direction agnostic algorithm
        // Running balancer
        let balance = 0;
        const avgStep = (to - from) / num;
        const orders = new Array(num).fill(from);
        orders[num - 1] = to;
        for (let i = 1; i < num - 1; i++) {
            const offset = fuzzOffset(avgStep, balance);
            balance -= offset;
            orders[i] = orders[i - 1] + avgStep + offset;
        }
        return orders;
    }
    const fuzzSizes = (num) => {
        const sizes = new Array();
        for (let i = 0; i < num; i++) {
            sizes.push(fuzzSize());
        }
        return sizes;
    }
    const fuzzOrders = (low, high, num) => {
        const prices = fuzzPrices(low, high, num);
        const sizes = fuzzSizes(num);
        const orders = prices.map((p, idx) => ({
            price: p,
            size: sizes[idx],
        }));
        return orders;
    }
    const fuzzMarket = (low, high, num) => {
        const gap = fuzzGap();
        const middle = (high - low) / 2;
        const bidRange = [low, middle - gap];
        const askRange = [middle + gap, high];
        const bids = fuzzOrders(...bidRange, num);
        const asks = fuzzOrders(...askRange, num);
        return ({
            bids,
            asks,
        });
    }

    /*
    =================================
    Manual check
    =================================
    */
    console.table(await getBestBooks());
    console.debug(fuzzSize());
    console.table(fuzzPrices(0.031025, 0.0325, 10));
    console.table(fuzzSizes(10));
    console.table(fuzzOrders(0.001, 0.002, 5));
    console.table(fuzzMarket(0.0001, 0.005, 10));
}
)();
