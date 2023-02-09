// Event listener for the form submission

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the user input
    let cryptoAmount = document.querySelector("input[name='crypto_amount']").value;

    // Si on rentre quelque chose d'autre qu'un chiffre on le supprime automatiqument du champs
    // vérifie si ce qui est entré dans le champ "Montant" est un nombre à chaque fois qu'un caractère est saisi, et efface automatiquement tout caractère qui n'est pas un chiffre.
    document.querySelector("input[name='crypto_amount']").addEventListener("input", function(event) {
        // Si l'entrée n'est pas un chiffre, on l'efface
        if (isNaN(event.target.value)) {
            event.target.value = event.target.value.slice(0, -1);
        }
    });
    let cryptoCurrencyFrom = document.querySelector("select[name='crypto_currency_from']").value;
    let cryptoCurrencyTo = document.querySelector("select[name='crypto_currency_to']").value;

    //check if cryptoAmount is number
    if (!/^\d*\.?\d*$/.test(cryptoAmount)) {
        // show error message
        document.querySelector("#result").innerHTML = "Entrez un nombre valide";
        return;
      }

    // API endpoint for crypto-euros conversion with low limits
    let endpoint = "https://min-api.cryptocompare.com/data/price?fsym="+cryptoCurrencyFrom+"&tsyms="+cryptoCurrencyTo;
    // With API key with 100 000 calls
    // let endpoint = "https://min-api.cryptocompare.com/data/price?fsym="+cryptoCurrencyFrom+"&tsyms="+cryptoCurrencyTo+"&api_key="+ process.env.API_KEY;


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
                    result = cryptoAmount * rate;
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
