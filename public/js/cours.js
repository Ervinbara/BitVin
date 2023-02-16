async function getCryptoData() {
  const symbols = ['BTC', 'ETH', 'XRP', 'LTC','ETC'];
  try {
    const prices = await Promise.all(symbols.map(async symbol => {
      const response = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=EUR`);
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
  chart.update();
}


async function createCryptoChart() {
  const prices = await getCryptoData();
  const labels = prices.map(price => price.symbol);
  const data = prices.map(price => price.price);
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


// Tableau 
async function getCryptoPrices() {
  try {
    const symbols = ['BTC', 'ETH', 'XRP', 'LTC', 'ETC'];
    const promises = symbols.map(async symbol => {
      const priceResponse = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=EUR`);
      const variationResponse = await axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=EUR&limit=1`);
      const price = priceResponse.data.EUR;
      const variation = variationResponse.data.Data.Data[0].close - price;
      return { symbol, price, variation };
    });

    const prices = await Promise.all(promises);

    // Create table
    const table = document.createElement("table");

    // Create table headers
    const headers = ["Symbole", "Prix en EUR", "Variation 24/H"];
    const headerRow = document.createElement("tr");
    headers.forEach(header => {
      const th = document.createElement("th");
      th.innerText = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Add data to table
    prices.forEach(priceData => {
      const row = document.createElement("tr");
      const symbolCell = document.createElement("td");
      symbolCell.innerText = priceData.symbol;
      row.appendChild(symbolCell);
      const priceCell = document.createElement("td");
      priceCell.innerText = priceData.price;
      row.appendChild(priceCell);
      const variationCell = document.createElement("td");
      variationCell.innerText = priceData.variation;
      row.appendChild(variationCell);
      table.appendChild(row);
    });

    // Add table to HTML
    document.body.appendChild(table);
  } catch (error) {
    console.error(error);
  }
}

  
  getCryptoPrices();