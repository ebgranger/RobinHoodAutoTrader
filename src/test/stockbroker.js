import React, { Component } from 'react';

  class StockBroker extends Component {
    render() {

      //console.log("pineapple");
      //console.log("props - ", this.props.state);
      // console.log("stockTrade - ", this.props.state.stockTradeInput);
      // console.log("stockTrade - ", this.props);
      // console.log("stockTrade - ",this.props.state.stockTrade);
      
      return (
        <div className="stockBrokerStock">
          <div>Stock Broker Stock: </div>
          <input placeholder="stock"
            onChange={(event) => this.props.stockTradeInput(event.target.value)}
          />
          <button className="button--search" onClick={() => this.props.stockTrade()} >SEARCH </button>
        </div>
      );
    }

  }

// you export so you can have access to this component in your other files
export default StockBroker;
