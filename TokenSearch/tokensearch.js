let button = document.getElementById("button");

function GetData() {
    let inputData = document.getElementById("input").value;

    let ws = new WebSocket(`wss://stream.binance.com:9433/ws/${inputData}@trade`);

    ws.onmessage = (event) => {
        let jsondata = JSON.parse(event.data);


        console.log(jsondata.p);
    }


}

button.onclick = GetData;

