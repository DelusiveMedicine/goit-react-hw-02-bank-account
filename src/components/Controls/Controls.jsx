/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import PropTypes from 'prop-types';
import shortId from 'shortid';

class Controls extends Component {
  state = { amount: 0 };

  changeHandler = ({ target }) => {
    const { value } = target;
    const valueNumber = Number(value);
    this.setState({
      amount: valueNumber,
    });
  };

  clickHandler = ({ target }) => {
    const { toastManager, onDeposit, transaction } = this.props;
    const { dataset } = target;
    const { amount } = this.state;

    if (amount <= 0) {
      return toastManager.add('Введите сумму для проведения операции!', {
        appearance: 'warning',
        autoDismiss: true,
      });
    }

    transaction.type = dataset.name;
    transaction.amount = amount;
    transaction.date = new Date().toLocaleString();
    transaction.id = shortId();

    if (dataset.name === 'deposit') onDeposit(amount);
    if (dataset.name === 'withdraw') this.withdrawHandler();
    this.setState({amount: 0})
  };

  withdrawHandler = () => {
    const { onWithdraw, toastManager, balance } = this.props;
    const { amount } = this.state;
    if (balance < amount) {
      return toastManager.add(
        'На счету недостаточно средств для проведения операции!',
        {
          appearance: 'warning',
          autoDismiss: true,
        },
      );
    }
    onWithdraw(amount);
  };

  render() {
    const { amount } = this.state;

    return (
      <section>
        <input
          type="number"
          name="amount"
          value={amount}
          onChange={this.changeHandler}
        />
        <button type="button" data-name="deposit" onClick={this.clickHandler}>
          Deposit
        </button>
        <button type="button" data-name="withdraw" onClick={this.clickHandler}>
          Withdraw
        </button>
      </section>
    );
  }
}

Controls.propTypes = {
  onDeposit: PropTypes.func.isRequired,
  onWithdraw: PropTypes.func.isRequired,
  toastManager: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    .isRequired,
};

export default withToastManager(Controls);
