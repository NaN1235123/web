document.querySelector(".burger").addEventListener("click", function() {
    this.classList.toggle('active');
    document.querySelector('.menu').classList.toggle('open');
})



let btcprice = document.getElementById("btcusdt");
let ethprice = document.getElementById("ethusdt");
let solanprice = document.getElementById("solanusdt");

let changePrices = [document.getElementById("procentBtc"),document.getElementById("procentEth"), document.getElementById("procentSol") ];



let urls = [
    "https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT", 
    "https://api.binance.com/api/v3/ticker/24hr?symbol=ETHUSDT", 
    "https://api.binance.com/api/v3/ticker/24hr?symbol=SOLUSDT"
];

function fetchPrices() {
    Promise.all(urls.map(url => fetch(url).then(resp => resp.json())))
        .then(results => {
            // Обновляем текущую цену
            btcprice.innerHTML = Number(results[0].lastPrice).toString();
            ethprice.innerHTML = Number(results[1].lastPrice).toString();
            solanprice.innerHTML = Number(results[2].lastPrice).toString();


             // Обновляем процент изменения цены за 24 часа
            for(let i = 0, j = 0; i < changePrices.length, j < results.length; i++, j++) {
                if(results[j].priceChangePercent < 0) {
                    changePrices[i].innerHTML = results[j].priceChangePercent + "%";
                    changePrices[i].style.color = "red";
                } 
                else if(results[j].priceChangePercent > 0) {
                    changePrices[i].innerHTML = "+" + results[j].priceChangePercent + "%";
                    changePrices[i].style.color = "green";
                }
                else {
                    changePrices[i].innerHTML = results[j].priceChangePercent;
                    changePrices[i].style.color = "black";
                }
            }

           
          
        })
        .catch(error => console.error("Ошибка:", error));
}

// Вызываем fetchPrices сразу при загрузке страницы
fetchPrices();

// Устанавливаем интервал вызова функции каждые 10 секунд (10000 миллисекунд)
setInterval(fetchPrices, 10000);