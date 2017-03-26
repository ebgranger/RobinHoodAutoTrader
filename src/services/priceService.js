/* eslint-disable */
import Api from '../helpers/api';
import Purchase from '../helpers/purchase';

class PriceService {
    constructor(symbol, config = {}) {
        this._options = Object.assign({}, {
             interval: 3000,
             limit: 2000,
             cb: null,
             buyPrice: null,
             fivePercent: 0,  
             sellOutPrice: 0,  
             sellPrice: 0, 
             purchased: [],
             avg: 0,
             maxPurchases: 5,
             totalSold: 0,
             totalBought: 0,
             userName: null,
             password: null,
             accountNumber: null,
        }, config);

        this._symbol = symbol;
        this._currentPrice = null;
        this._timer = null;
        this.purchased = this._options.purchased;

        this._buyPrice = this._options.buyPrice;
        this._fivePercent = this._options.fivePercent;
        this._sellOutPrice = this._options.sellOutPrice;
        this._sellPrice = this._options.sellPrice;
        this._avg = this._options.avg;
        this._totalSold = this._options.totalSold;
        this._totalBought = this._options.totalBought;
        this._userName = this._options.userName;
        this._password = this._options.password;
        this._accountNumber = this._options.accountNumber;

    }
    getSymbol() {
        return this._symbol;
    }
    getPrice() {
        return this._currentPrice;
    }
    getPurchased() {
        return this.purchased;
    }
    getNumUnsoldPurchases() {
        return this.purchased.reduce((num, purchase) => {
            let qty = parseFloat(purchase.quantity());
            if(purchase.side() === "sell") {
                qty *= -1;
            }
            return num + qty;
        }, 0);
    }
    getNumSold() {
        return this._totalSold;
    }
    getNumBought() {
        return this._totalBought;
    }
    start() {
        console.log("i have styartedddddd");
        
        let i = 0;
        var beginTimer = () => {
            Api.symbolSearch(this._symbol).then((results) => {

                console.log("getting current price");
                this._currentPrice = results[0].last_trade_price;
                console.log(this._currentPrice);
                console.log(this._options.buyPrice);
                console.log(this.purchased);
                console.log(this.purchased.length);
                console.log(this._symbol);
                /***
                ** REMINDER **
                ***/
                // change back if to buyPrice using fixed price to force purchase
                if((this._buyPrice >= this._currentPrice && this.getNumUnsoldPurchases() < this._options.maxPurchases && this._options.maxPurchases > this._totalSold)) {
                    const ticker = '"' + this._symbol + '"';
                    const buyPrice = '"' + this._buyPrice + '"';
                    const sellOutPrice = '"' + this._sellOutPrice + '"';

                    Api.buyStockFAKE(ticker, buyPrice, 1, sellOutPrice).then((response) => {
                        this.purchased.push(new Purchase(response));
                        console.log("bought");
                        this._totalBought += 1;
                    });
                }
                this.purchased = this.purchased.filter((purchase) => {
                    return purchase.state() !== 'canceled' && purchase.state() !== 'failed' && purchase.state() !== 'rejected' 
                });
                if(this.purchased.length > 0) {
                    for(let p = 0, l = this.purchased.length; p < l; p++) {
                        let purchase = this.purchased[p];
                        if(purchase.price() >= this._sellPrice && purchase.state() === 'filled') {
                            //sell!
                            const ticker = '"' + this._symbol + '"';
                            const sellPrice = '"' + this._sellPrice + '"';

                            Api.sellStockFAKE(ticker, sellPrice, 1 ).then((response) => {
                                console.log("sold");
                                const index = this.purchased.indexOf(purchase);
                                this.purchased.splice(index, 1);
                                this._totalSold += 1;
                            });
                        }
                    }
                }
                if(this._options.cb !== null) {
                    this._options.cb(results[0].last_trade_price);
                }
                i++;
                if(this._options.limit === 0 || i < this._options.limit) {
                    this._timer = setTimeout(beginTimer, this._options.interval);
                }
            });
        }
        beginTimer();
    }
    stop() {
        if(this._timer) {
            clearTimeout(this._timer);
        }
    }
}
export default PriceService;
