async function getCryptoData() {
  const symbols = ['BTC', 'ETH', 'XRP', 'LTC','ETC'];
  try {
    const prices = await Promise.all(symbols.map(async symbol => {
      const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=EUR`);
      // const responseVariation24h = await axios.get(`https://min-api.cryptocompare.com/data/histominute?fsym=${symbol}&tsym=EUR&limit=1440`);
      // const prices = responseVariation24h.data.Data;
      // const firstPrice = prices[0].close;
      // const lastPrice = prices[prices.length - 1].close;
      // const variation = ((lastPrice - firstPrice) / firstPrice) * 100;
      const price = response.data.EUR;
      return { symbol, price};
    }));
    return prices;
  } catch (error) {
    console.error(error);
  }
}


async function updateCryptoPrices() {
  const prices = await getCryptoData();
  chart.data.labels = prices.map(price => price.symbol);
  chart.data.datasets[0].data = prices.map(price => price.price);
  // chart.options.scales.yAxes[0].ticks.callback = function(value, index, values) {
  //   return `${value} € (${prices[index].variation}%)`;
  // };
  chart.update();
}


async function createCryptoChart() {
  const prices = await getCryptoData();
  const labels = prices.map(price => price.symbol);
  const data = prices.map(price => price.price);
  // const variations = prices.map(price => price.variation);

  const ctx = document.getElementById('priceChart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Prix en EUR',
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1,
        // variations
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      width: 100,
      height: 200
    }
  });
  setInterval(updateCryptoPrices, 2000);
}

createCryptoChart();
