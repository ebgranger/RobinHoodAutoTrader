import React, { Component } from 'react';

  class Account extends Component {
    render() {

      //console.log("pineapple")
      console.log("this.props.Account",this.props.Account);
      
      if(this.props.Account === undefined){
        return (
          <div className="account">
          Please update Account
          <button onClick={() => this.props.updateAccount()} >UPDATE</button>
          </div>
        );
      }

      return (
        <div className="account">
          <button onClick={() => this.props.updateAccount()} >UPDATE</button>
          <div>Account #:</div>
          <div>Profolio Value: </div>

        </div>
      );
    }

  }

// you export so you can have access to this component in your other files
export default Account;
