const Head = (isBid) => `
<div class="header ${isBid ? "bid" : "ask"}">
  <p class="size">Size</p>
  <div class="spacing"></div>
  <p class="bid-ask">${isBid ? "Bid" : "Ask"}</p>
</div>
`;

const Row = (price, size, isBid) => `
<div class="row ${isBid ? "bid" : "ask"}">
  <p class="size">${size.toFixed(12)}</p>
  <div class="spacing"></div>
  <p class="price">${price.toFixed(12)}</p>
</div>
`;

const Divider = () => `<hr>`;

const Card = (isBid, marketData) => `
<div class="card">
${Head(isBid)}
${Divider()}
${marketData
    .map(record => Row(record.price, record.size, isBid))
    .join('\n')
}
${Divider()}
${isBid ? BidInfo(marketData) : AskInfo(marketData)}
</div>
`;

const BidInfo = (marketData) => `
<div class="meta bid">
  <p>Total bid volume: ${marketData.reduce((prev, curr) => prev + curr.price * curr.size, 0)}</p>
</div>
`;

const AskInfo = (marketData) => `
<div class="meta ask">
  <p>Total ask size: ${marketData.map(record => record.size).reduce((prev, curr) => prev + curr)}</p>
</div>
`;

export default Card;
