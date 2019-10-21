/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import PropTypes from 'prop-types';
import Controls from '../Controls/Controls';

class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
  };

  onDeposit = amount => {
    this.setState(prevState => ({ balance: prevState.balance + amount }));
  };

  onWithdraw = amount => {
    const { toastManager } = this.props;
    const { balance } = this.state;
    if (balance >= amount) {
      this.setState(prevState => ({ balance: prevState.balance - amount }));
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
    const { balance } = this.state;
    const { toastManager } = this.props;
    return (
      <div>
        <Controls
          toastManager={toastManager}
          value={balance}
          onDeposit={this.onDeposit}
          onWithdraw={this.onWithdraw}
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  toastManager: PropTypes.func.isRequired,
};

export default withToastManager(Dashboard);
