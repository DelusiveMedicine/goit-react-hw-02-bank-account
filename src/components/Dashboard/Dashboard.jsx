/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import PropTypes from 'prop-types';
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
      transactions: [...prevState.transactions, prevState.transaction],
    }));
  };

  onWithdraw = amount => {
    const { toastManager } = this.props;
    const { balance } = this.state;
    if (balance >= amount) {
      this.setState(prevState => ({
        balance: prevState.balance - amount,
        transactions: [...prevState.transactions, prevState.transaction],
      }));
    } else {
      toastManager.add(
        'На счету недостаточно средств для проведения операции!',
        {
          appearance: 'warning',
          autoDismiss: true,
        },
      );
    }
  };

  render() {
    console.log(this.state);
    const { balance, transactions } = this.state;
    const { toastManager } = this.props;
    return (
      <div>
        <Controls
          transactions={transactions}
          toastManager={toastManager}
          value={balance}
          onDeposit={this.onDeposit}
          onWithdraw={this.onWithdraw}
        />
        <Balance balance={balance} />
      </div>
    );
  }
}

Dashboard.propTypes = {
  toastManager: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
};

export default withToastManager(Dashboard);
