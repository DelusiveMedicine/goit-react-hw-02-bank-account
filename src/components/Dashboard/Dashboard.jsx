/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  onDeposit = amount => {
    this.setState(prevState => ({
      balance: prevState.balance + amount,
    }));
  };

  onWithdraw = amount => {
    this.setState(prevState => ({
      balance: prevState.balance - amount,
    }));
  };

  getTransaction = transaction => {
    this.setState(prevState => ({
      transactions: [...prevState.transactions, transaction],
    }));
  };

  render() {
    const { balance, transactions } = this.state;
    return (
      <div>
        <Controls
          transactions={transactions}
          balance={balance}
          onDeposit={this.onDeposit}
          onWithdraw={this.onWithdraw}
          getTransaction={this.getTransaction}
        />
        <Balance balance={balance} />
      </div>
    );
  }
}

export default Dashboard;
