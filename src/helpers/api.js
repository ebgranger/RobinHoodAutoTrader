/* eslint-disable */
import axios from 'axios';

const Api = {};

Api.buyStock = function(ticker, price, quantity, stopPrice, instrument, accountNumber, token) {

    const request = axios.post("http://localhost:8080/stock/buy/" + ticker + "/" + price + "/" + quantity + "/" + stopPrice + "/" + instrument + "/" + accountNumber + "/" + token + "");   
    return request;
  }

  Api.buyStockFAKE = function(ticker, price, quantity, stopPrice, instument) {
    return new Promise((resolve, reject) => {
      resolve({
        "updated_at": "2017-01-30T13:46:04.333497Z",
        "ref_id": null,
        "time_in_force": "gtc",
        "fees": "0.00",
        "cancel": "https://api.robinhood.com/orders/4e6a25a5-a067-4696-b4c4-d2f0e69015b4/cancel/",
        "id": "4e6a25a5-a067-4696-b4c4-d2f0e69015b4",
        "cumulative_quantity": "0.00000",
        "stop_price": "0.12300000",
        "reject_reason": null,
        "instrument": "https://api.robinhood.com/instruments/9d68b294-f3b9-4591-a85e-6efe95b3bebd/",
        "state": "filled",
        "trigger": "stop",
        "type": "limit",
        "last_transaction_at": "2017-01-30T13:46:04.300391Z",
        "price": "0.12500000",
        "executions": [],
        "extended_hours": false,
        "created_at": "2017-01-30T13:46:04.300391Z",
        "side": "buy",
        "average_price": null,
        "quantity": "1.00000"
      });
    });
  }

    Api.sellStockFAKE = function(ticker, price, quantity, stopPrice) {
    return new Promise((resolve, reject) => {
      resolve({
        "updated_at": "2017-01-30T13:46:43.553915Z",
        "ref_id": null,
        "time_in_force": "gtc",
        "fees": "0.00",
        "cancel": "https://api.robinhood.com/orders/13529300-1117-4fc6-90b3-5cfa46c25fe2/cancel/",
        "cumulative_quantity": "0.00000",
        "stop_price": null,
        "reject_reason": null,
        "instrument": "https://api.robinhood.com/instruments/3a47ca97-d5a2-4a55-9045-053a588894de/",
        "state": "filled",
        "trigger": "immediate",
        "type": "limit",
        "last_transaction_at": "2017-01-30T13:46:43.524992Z",
        "price": "0.12600000",
        "executions": [],
        "extended_hours": false,
        "created_at": "2017-01-30T13:46:43.524992Z",
        "side": "sell",
        "average_price": null,
        "quantity": "1.00000"
      });
    });
  }

  Api.orderStatus = function(orderStatusUrl) {
    const myHeaders = new Headers();
    const myInit = { method: 'GET',
           headers: myHeaders,
           mode: 'cors',
           cache: 'no-cache'
         };
    return fetch(orderStatusUrl, myInit).then((response) => {
      return response.json();
    });
  }

Api.symbolSearch = function(term) {
    const url = `https://api.robinhood.com/quotes/?symbols=${term}`;
    const myHeaders = new Headers();
    const myInit = { method: 'GET',
           headers: myHeaders,
           mode: 'cors',
           cache: 'no-cache'
         };
    return fetch(url, myInit).then(
      (response) => {
        return response.json();
      }, (err) => { console.log("you have an error sorry", err)})
    .then((json) => {
      var result = json.results;
      return result;
    });
  }

Api.historicData = function(term, interval = "day") {
    const url = `https://api.robinhood.com/quotes/historicals/${term}/?interval=${interval}`;
    const myHeaders = new Headers();
    const myInit = { method: 'GET',
           headers: myHeaders,
           mode: 'cors',
           cache: 'no-cache'
         };
    return fetch(url, myInit).then(
      (response) => {
        return response.json();
      }, (err) => { console.log("you have an error sorry", err)})
    .then((json) => {
      var result = json.historicals;
      console.log("okayyyy" , result);
      return result;
    });
  }

Api.sellStock = function(ticker, price, quantity, instrument, accountNumber, token){

    const request =axios.post("http://localhost:8080/stock/sell/" + ticker + "/" + price + "/" + quantity + "/" + instrument + "/" + accountNumber + "/" + token + "");

    return request;
  }

Api.getToken = function(username, password){

    const request = axios.post("http://localhost:8080/token/" + username + "/" + password + "");
    console.log(request); 
    return request;
  }

 Api.getAccountInfo = function(username, password, token){
    const request =axios.get('http://localhost:8080/accounts/' + username + '/' + password + '/' + token + '');

    return request.then( (data) => {
      const buyingPower = data.data.results[0].buying_power;
      const accountNumber = data.data.results[0].account_number;
      const accountInfo = [ buyingPower, accountNumber ];
      return accountInfo;
    });
}

export default Api;