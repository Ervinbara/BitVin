// Event listener for the form submission
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the user input
    let cryptoAmount = document.querySelector("input[name='crypto_amount']").value;
    let cryptoCurrencyFrom = document.querySelector("select[name='crypto_currency_from']").value;
    let cryptoCurrencyTo = document.querySelector("select[name='crypto_currency_to']").value;

    // API endpoint for crypto-euros conversion with low limits
    let endpoint = "https://min-api.cryptocompare.com/data/price?fsym="+cryptoCurrencyFrom+"&tsyms="+cryptoCurrencyTo;
    // With API key with 100 000 calls
    // let endpoint = "https://min-api.cryptocompare.com/data/price?fsym="+cryptoCurrencyFrom+"&tsyms="+cryptoCurrencyTo+"&api_key=cd28407f9d7748eade31b680c9f10707d577a6f5f7dd143374c4d5c3d1a7e1fe";


    // Fetch the API data
    fetch(endpoint)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function(data) {
            let rate = data[cryptoCurrencyTo];
            let result;
            if(rate){
                // Conversion logic
                if(cryptoCurrencyFrom === "EUR"){
                    result = cryptoAmount * rate;
                } else {
                    result = cryptoAmount / rate;
                }
                // Display the result
                document.querySelector("#result").innerHTML = `${cryptoAmount} ${cryptoCurrencyFrom} = ${result.toFixed(8)} ${cryptoCurrencyTo}`;
            } else {
                document.querySelector("#result").innerHTML = `Aucun taux disponible pour ${cryptoCurrencyFrom} vers ${cryptoCurrencyTo}`;
            }
        })
        .catch(function(error) {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
            document.querySelector("#result").innerHTML = `Aucun taux disponible pour ${cryptoCurrencyFrom} vers ${cryptoCurrencyTo}`;
        });
});
