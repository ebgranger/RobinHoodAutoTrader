import Api from './api';

const isEndState = function(state) {
    if(state === 'filled' || state === 'rejected' || state === 'canceled' || state === 'failed') {
        return true;
    }
    return false;
}

export default class Sell {
    constructor(info) {
        this._info = info;
        if(!isEndState(this._info.state)) {
            //start up a timer that periodically checks the status of the order.
            const updateStatus = () => {
                Api.orderStatus(this._info.url).then((newInfo) => {
                    if(!isEndState(newInfo.state)) {
                        setTimeout(updateStatus, 2000);
                    } else {
                        this._info = newInfo;
                    }
                });
            };
        }
    }  
    state() {
        return this._info.state;
    }
    quantity() {
        return this._info.quantity;
    }
    price() {
        return this._info.price;
    }
    side() {
        return this._info.side;
    }
    cancelPurchase() {
        if(this._info.state !== 'canceled') {
            //code to cancel purchase
        }
    }
}