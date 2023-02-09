async function getTopAndWorstCrypto() {
  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD');
    const topAndWorstCrypto = response.data.Data.slice(0, 20);
    return topAndWorstCrypto;
  } catch (error) {
    console.error(error);
  }
}

async function displayTopAndWorstCrypto() {
  const topAndWorstCrypto = await getTopAndWorstCrypto();
  const topCrypto = topAndWorstCrypto.slice(0, 10);
  const worstCrypto = topAndWorstCrypto.slice(10);
  
  const topContainer = document.createElement('div');
  topContainer.innerHTML = '<h2>Meilleures crypto-monnaies</h2><ul id="topList"></ul>';
  const topList = topContainer.querySelector('#topList');
  topCrypto.forEach(crypto => {
    const item = document.createElement('li');
    item.innerText = `${crypto.CoinInfo.FullName} (${crypto.CoinInfo.Name}) - ${crypto.RAW.USD.PRICE.toFixed(2)} USD`;
    topList.appendChild(item);
  });
  
  const worstContainer = document.createElement('div');
  worstContainer.innerHTML = '<h2>Pires crypto-monnaies</h2><ul id="worstList"></ul>';
  const worstList = worstContainer.querySelector('#worstList');
  worstCrypto.forEach(crypto => {
    const item = document.createElement('li');
    item.innerText = `${crypto.CoinInfo.FullName} (${crypto.CoinInfo.Name}) - ${crypto.RAW.USD.PRICE.toFixed(2)} USD`;
    worstList.appendChild(item);
  });
  
  const topAndWorstContainer = document.querySelector('#topAndWorstContainer');
  topAndWorstContainer.appendChild(topContainer);
  topAndWorstContainer.appendChild(worstContainer);
}

displayTopAndWorstCrypto();