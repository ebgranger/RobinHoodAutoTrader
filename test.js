import './App.css';
import _ from 'lodash';
import React, { Component } from 'react';
// import axios from 'axios';
//import SearchBar from './search_bar';
//import SymbolDetail from './symbol_detail';
// import StockBroker from './stockbroker';
// import Stocks from './Stocks';
// import Account from './account';
// import StockTrading from './stock_trading';
import Api from './helpers/api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stockTradeInput: "",
      stockTrade: "",
      Stock: {
        last_trade_price: ""
      },
      price: ""
   };
    this.start = this.start.bind(this);
  }


start(){

  var priceArray = [];
  var total = 0;
  //  var price = this.state.Stock.last_trade_price;
  var currState = this.state;

  // console.log(currState);
  // function doSetTimeOut(this) {
  //   console.log("hey", this.state);
  //   setTimeout((function() {
  //     console.log("set time out", this.state);
  //     Api.symbolSearch("CVM").then((results) => {
  //       console.log("inside the api call", this.state);
  //     // set state here
  //       this.setState({
  //         Stock: {
  //           last_trade_price: results[0].last_trade_price
  //         }
  //       })
  //     });
  //     if(this.state.Stock.last_trade_price){
  //       priceArray.push(parseFloat(this.state.Stock.last_trade_price));
  //       console.log("i pushed to the array");
  //     }
  //   }), 2000)
  // }


      Api.symbolSearch("CVM").then((results) => {
      // set state here
        this.setState({
          Stock: {
            last_trade_price: results[0].last_trade_price
          }
        })
      });
      if(this.state.Stock.last_trade_price){
        priceArray.push(parseFloat(this.state.Stock.last_trade_price));
      }
  

  for(var i = 0; i <= 20; i++ ){
    // doSetTimeOut(currState);
    // console.log("im running first for loop");
  }
  if(priceArray[0] !== "" && total !== 0){
    var number = this.state.Stock.last_trade_price;
    console.log("im setting the number ", number);

    var initialNumber = "";
      if(number){
        initialNumber = priceArray[0];
        console.log("set initialNumber");
        console.log(initialNumber);
      }

    console.log("initial number outside of if ", initialNumber);

    if(priceArray[0] !== isNaN){
      for(var i = 0; i < priceArray.length; i++) {
        total += priceArray[i];
      }
    }
    var avg = "";
    var fivePercent = "";
    var buyPrice = "";
    var sellPrice = "";
    var sellOut = "";

    Api.symbolSearch("CVM").then((results) => {
      // set state here
      this.setState({
        price: results[0].last_trade_price
      })
    }); 

    var currentPrice = this.state.price;   
    console.log('current price ', currentPrice);

    if(number){
      console.log("hit")
      avg = total / priceArray.length;
      fivePercent = (5 / 100) * avg;
      buyPrice = (avg - fivePercent);
      sellPrice = buyPrice + fivePercent;
      sellOut = buyPrice - 0.007;
      console.log("avg ", avg);
      console.log("fivePercent ", fivePercent);
      console.log("buyPrice ", buyPrice);
      console.log("sellPrice ", sellPrice);
      console.log("sellOut ", sellOut);
    }

    var sold = false; 
    var run = 2;
    if(priceArray[0] !== "" && number && currentPrice){
      for(var i =0; i < 20; i++) {
        console.log("im running")
        if(buyPrice === currentPrice && number && run > 0) {
          // buy api call 
          // Api.buyStock();
          console.log("bought");
          while(!sold){
            if(sellPrice === currentPrice || currentPrice === sellOut) {
              // sell out
              //  Api.sellStock();
              console.log("sold");
              sold = true;
              run = run - 1;
            } else {
                sold = false;
              }
          }
          console.log("didnt hit the while");
          run = run - 1;
          return;
        }
      }
    }
  }
}

  render() {
  //  const symbolSearch = _.debounce((term) => { this.symbolSearch(term) }, 1000);
    return (
      <div>
        <button onClick={this.start} > Start </button>
      </div>
    );
    }
}

export default App;

      //  <StockBroker
      //    state={this.state}
      //    stockTradeInput={(stock) => this.stockTradeInput(stock)}
      //    stockTrade={() => this.stockTrade()}

      //   />
      //  <Stocks Stocks={this.state.Stocks} />
      //  <Account
      //    Account={this.state.Account}
      //    updateAccount={() => this.updateAccount()}
      //  />
      //  <StockTrading
      //    TradeStockInfo={this.state.TradeStockInfo}
      //    buyStock={() => this.buyStock()}
      //    sellStock={() => this.sellStock()}
      //  />