/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';

const initState = {
  id: '',
  type: '',
  amount: 0,
  date: '',
};

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    transaction: {...initState}
  };


  onDeposit = amount => {
    this.setState(prevState => ({
      balance: prevState.balance + amount,
    }));
    this.addTransaction();
  };

  onWithdraw = amount => {
    this.setState(prevState => ({
      balance: prevState.balance - amount,
    }));
    this.addTransaction();
  };

  addTransaction = () => {
    const { transaction } = this.state;
    this.setState(prevState => ({
      transactions: [...prevState.transactions, transaction],
      transaction: {...initState}
    }));
  }

  render() {
    const { balance, transaction } = this.state;
    return (
      <div>
        <Controls
          transaction={transaction}
          onDeposit={this.onDeposit}
          onWithdraw={this.onWithdraw}
          balance = {balance}
        />
        <Balance balance={balance} />
      </div>
    );
  }
}

export default Dashboard;
