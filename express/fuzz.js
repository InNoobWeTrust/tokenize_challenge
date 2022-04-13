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

const fuzzOrders = (low, high, num, adjust) => {
  const prices = fuzzPrices(low, high, num);
  const originalSizes = fuzzSizes(num);
  const sizes = adjust(prices, originalSizes);
  const orders = prices.map((p, idx) => ({
    price: p,
    size: sizes[idx],
  }));
  return orders;
}

const askSizeAdjust = (prices, sizes) => {
  const total = sizes.reduce((prev, curr) => prev + curr);
  if  (total < 150) return sizes;
  const adjustment = 150 / total;
  return sizes.map(item => item * adjustment);
}

const bidSizeAdjust = (prices, sizes) => {
  const totalVolume = sizes.reduce((prev, curr, idx) => {
    const nextVolume = curr * prices[idx];
    return prev + nextVolume;
  }, 0);

  if (totalVolume < 5) return sizes;
  const avgPrice = prices.reduce((prev, curr) => prev + curr) / prices.length;
  const totalSize = sizes.reduce((prev, curr) => prev + curr);
  const adjustment = 5 / totalVolume / avgPrice;
  return sizes.map(item => item * adjustment);
}

const fuzzMarket = (low, high, num) => {
  const gap = fuzzGap(low, high);
  const middle = low + (high - low) / 2;
  const bidRange = [middle - gap, low]; // Direction: higher -> lower
  const askRange = [middle + gap, high]; // Direction: lower -> higher
  const bids = fuzzOrders(...bidRange, num, bidSizeAdjust);
  const asks = fuzzOrders(...askRange, num, askSizeAdjust);
  return ({
    bids,
    asks,
  });
}

module.exports = fuzzMarket;
