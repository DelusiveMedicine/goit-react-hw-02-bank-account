import React, { Component } from 'react';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

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
    transaction: { ...initState },
    income: 0,
    expenses: 0,
  };

  onDeposit = amount => {
    const { income } = this.state;
    this.setState(prevState => ({
      balance: prevState.balance + amount,
      income: prevState.income + amount,
    }));
    this.addTransaction();
  };

  onWithdraw = amount => {
    const { expenses } = this.state;
    this.setState(prevState => ({
      balance: prevState.balance - amount,
      expenses: prevState.expenses + amount,
    }));
    this.addTransaction();
  };

  addTransaction = () => {
    const { transaction } = this.state;
    this.setState(prevState => ({
      transactions: [...prevState.transactions, transaction],
      transaction: { ...initState },
    }));
  };

  render() {
    const { balance, transaction, income, expenses, transactions } = this.state;
    return (
      <div>
        <Controls
          transaction={transaction}
          onDeposit={this.onDeposit}
          onWithdraw={this.onWithdraw}
          balance={balance}
        />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}

export default Dashboard;
