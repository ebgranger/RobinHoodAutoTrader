import './App.css';
import _ from 'lodash';
import React, { Component } from 'react';
import Api from './helpers/api';
import PriceService from './services/priceService';



export default class Home extends Component {
  constructor(props) {
        super(props);

        this.state = {
            stockTradeInput: "",
            stockTrade: "",
            Stock: {
                last_trade_price: ""
            },
            price: "",
            totalUnsold: 0,
            totalSold: 0,
            totalBought: 0,
            value: "",
            userName: "",
            password: "",
            token: "",
            isUserInfoSet: false,
            accountNumber: "",
        };
        this.start = this.start.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeUserName = this.handleChangeUserName.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleUserInfoSet = this.handleUserInfoSet.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    
    handleChangeUserName(event) {
        this.setState({userName: event.target.value});
    }

    handleChangePassword(event) {
        this.setState({password: event.target.value});
    }

    handleUserInfoSet() {
        this.setState({isUserInfoSet: true});
    }

    start(){
        var userToken = Api.getToken(this.state.userName, this.state.password);
        userToken.then((data) => { 
            this.setState({token: data.data});
        }).then(() => {

          Api.getAccountInfo(this.state.userName, this.state.password, this.state.token).then((data) => { this.setState({accountNumber: data[1]})});

            Api.historicData(this.state.value.toUpperCase()).then((results) => {
                console.log(this.state.accountNumber);
                var stockHistoryData = results;
                console.log(stockHistoryData);
                console.log('yooo', this.state.accountNumber);
                const stockAvg = 0.10;
                const stockFivePercent = 0.007;
                const stockBuyPrice = 0.09;
                const stockSellPrice = 0.10;
                const stockSellOut = 0.09;
                const accountUserName = this.state.userName;
                const accountPassword = this.state.password;
                const userAccountNumber = this.state.userName;

                console.log("stockAvg", stockAvg);
                console.log("stockFivePercent", stockFivePercent);
                console.log("stockBuyPrice", stockBuyPrice);
                console.log("stockSellPrice", stockSellPrice);
                console.log("stockSellOut", stockSellOut);
                console.log("stockSellOut", accountUserName);
                console.log("stockSellOut", accountPassword);
                console.log("stockSellOut", userAccountNumber);

                const newService = new PriceService(this.state.value.toUpperCase(), { 
                    buyPrice: stockBuyPrice,
                    fivePercent: stockFivePercent,
                    sellOutPrice: stockSellOut,
                    sellPrice: stockSellPrice,
                    avg: stockAvg,
                    userName: accountUserName,
                    password: accountPassword,
                    accountNumber: userAccountNumber,
                });

                newService.start();

                setInterval(() => {
                    this.setState({totalUnsold: newService.getNumUnsoldPurchases()});
                }, 100);

                setInterval(() => {
                    this.setState({totalBought: newService.getNumBought()});
                }, 100);

                setInterval(() => {
                    this.setState({totalSold: newService.getNumSold()});
                }, 100);
            });
        });
    }

  render() {
    if(!this.state.isUserInfoSet) {
    return (
      <div>
        <div>
          <label>
          Username:
          <input type="text" value={this.state.userName} onChange={this.handleChangeUserName} />
          Password:
          <input type="text" value={this.state.password} onChange={this.handleChangePassword} />
          </label>
          <button type="button" onClick={this.handleUserInfoSet} > Start </button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div>
            <label>
            Stock:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <button type="button" onClick={() => this.start() }> Start </button>
            <p>Num current shares: {this.state.totalUnsold}</p>
            <p>Num current shares bought: {this.state.totalBought}</p>
            <p>Num current shares sold: {this.state.totalSold}</p>
        </div>
      </div>
    );
  }
  }
}