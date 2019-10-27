import React, { Component } from 'react';
import styles from './Dashboard.module.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import thousandsSeparator from '../helpers';

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
    this.setState(prevState => ({
      balance: prevState.balance + amount,
      income: prevState.income + amount,
    }));
    this.addTransaction();
  };

  onWithdraw = amount => {
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
    const { dashboard } = styles;
    const fixedPointBalance = thousandsSeparator(balance.toFixed(2));
    const fixedPointIncome = thousandsSeparator(income.toFixed(2));
    const fixedPointExpenses = thousandsSeparator(expenses.toFixed(2));

    return (
      <div className={dashboard}>
        <Controls
          transaction={transaction}
          onDeposit={this.onDeposit}
          onWithdraw={this.onWithdraw}
          balance={balance}
        />
        <Balance
          balance={fixedPointBalance}
          income={fixedPointIncome}
          expenses={fixedPointExpenses}
        />
        <TransactionHistory items={transactions} />
      </div>
    );
  }
}

export default Dashboard;
