/*
=================================
Orders fuzz
=================================
*/
const fuzzGap = (low, high) => (high - low) * 0.1 * (1 + Math.random());

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
  // Generate prices using direction agnostic algorithm (self made up)
  // Running balancer
  let balance = 0;
  const avgStep = (to - from) / (num - 1);
  const orders = new Array(num);
  orders[0] = from;
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
  const gap = fuzzGap(low, high);
  const middle = low + (high - low) / 2;
  const bidRange = [middle - gap, low]; // Direction: higher -> lower
  const askRange = [middle + gap, high]; // Direction: lower -> higher
  const bids = fuzzOrders(...bidRange, num);
  const asks = fuzzOrders(...askRange, num);
  return ({
    bids,
    asks,
  });
}

module.exports = fuzzMarket;
