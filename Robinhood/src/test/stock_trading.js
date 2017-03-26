import React, { Component } from 'react';

//BEFORE:
//<td><a href="#">edit/</a> <a href="#">delete/</a> <a href="#">grades</a></td>

class Stocks extends Component {



  
  render() {
    console.log("Props - ", this.props.Stocks);
    console.log("",this.props.TradeStockInfo);
    console.log(this.props);

  //    function start(){
  //   console.log("tets");
  //  }

    // return (
    //   <div>
    //     <button className="start" onClick={() => start()} > Start </button>
    //   </div>
    // )
    // if(this.props.TradeStockInfo === undefined){
    //   return (

    //     <div className="stocksContainer">
    //       Please Start Trading Stocks
    //       <button className="button--search" onClick={() => this.props.buyStock()} > BUY </button>
    //       <button className="button--search" onClick={() => this.props.sellStock()} > SELL </button>
    //     </div>

    //   );
    // }
    // if(this.props.TradeStockInfo.side === "buy"){
    //   return (
    //       <div className="stocksContainer">
    //         Bought at : {this.props.TradeStockInfo.price}
    //         </div>
    //       )
    // } else{
    //   return (
    //       <div className="stocksContainer">
    //         Sold at : {this.props.TradeStockInfo.price}
    //       </div>
    //       )
    // }    


  }
}

export default Stocks;
