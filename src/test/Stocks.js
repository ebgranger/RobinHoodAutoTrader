import React, { Component } from 'react';

//BEFORE:
//<td><a href="#">edit/</a> <a href="#">delete/</a> <a href="#">grades</a></td>

class Stocks extends Component {


  render() {
    console.log("Props - ", this.props.Stocks);
    // {this.props.Stocks.map(function(stock) {
    //   return (
    //     <div key={stock.symbol}>
    //       name: {stock.symbol}
    //       price: {stock.last_trade_price}
    //     </div>
    //   );
    // })}
    if(this.props.Stocks === undefined){
      return (
        // <div>
        //   // <div>Working</div>
        //   <div>Name: {this.props.state.Name}</div>
        //   <div>LTP: {this.props.state.LastTradePrice}</div>
        // </div>
        <div className="stocksContainer">
          LOADING...
        </div>

      );
    }
    return (
        <div>
        {this.props.Stocks.map(function(stock){
          return (
            <div key={stock.symbol} className="stocksContainer">
            <ul>
              <li>Symbol Name: {stock.symbol}</li>
              <li>Adjusted Previous Close: {stock.adjusted_previous_close}</li>
              <li>Ask Price: {stock.ask_price}</li>
              <li>Ask Size: {stock.ask_size}</li>
              <li>Bid Price: {stock.bid_price}</li>
              <li>Bid Size: {stock.bid_size}</li>
              <li>Instrument: {stock.instrument}</li>
              <li>Last extended Hours Trade Price: {stock.last_extended_hours_trade_price}</li>
              <li>Last Trade Price: {stock.last_trade_price}</li>
              <li>Last Trade Price Source: {stock.last_trade_price_source}</li>
              <li>Previous Close: {stock.previous_close}</li>
              <li>Previous Close Date: {stock.previous_close_date}</li>
              <li>Updated At: {stock.updated_at}</li>
              </ul>
            </div>
          );
        })}
        </div>
      )

  }
}

export default Stocks;
