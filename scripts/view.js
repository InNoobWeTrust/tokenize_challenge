const Head = (isBid) => `
<div class="header ${isBid ? "bid" : "ask"}">
  <p class="size">Size</p>
  <div class="spacing"></div>
  <p class="bid-ask">${isBid ? "Bid" : "Ask"}</p>
</div>
`;

const Row = (price, size, isBid) => `
<div class="row ${isBid ? "bid" : "ask"}">
  <p class="size">${size}</p>
  <div class="spacing"></div>
  <p class="price">${price}</p>
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
</div>
`;

export default Card;
