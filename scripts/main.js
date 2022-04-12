import Card from './view.js';

(() => {
  const updater = () => (fetch('/.netlify/functions/server/market/10')
    .then(async (res) => {
      const {bids, asks} = await res.json();
      const bidElem = document.getElementById('bids');
      const askElem = document.getElementById('asks');

      bidElem.innerHTML = Card(true, bids);
      askElem.innerHTML = Card(false, asks);
    }));

  updater().then(() => setInterval(updater, 15000));
})();
