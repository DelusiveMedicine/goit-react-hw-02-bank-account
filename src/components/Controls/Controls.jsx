/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { withToastManager } from 'react-toast-notifications';
import PropTypes from 'prop-types';
import shortId from 'shortid';

const initState = {
  id: '',
  type: '',
  amount: 0,
  date: '',
};

class Controls extends Component {
  state = { ...initState };

  changeHandler = ({ target }) => {
    const { value } = target;
    const valueNumber = Number(value);
    this.setState({
      amount: valueNumber,
      id: shortId(),
      date: new Date().toLocaleString(),
    });
  };

  clickHandler = ({ target }) => {
    const { toastManager, onDeposit, getTransaction } = this.props;
    const { dataset } = target;
    const { amount, type } = this.state;

    if (amount <= 0) {
      return toastManager.add('Введите сумму для проведения операции!', {
        appearance: 'warning',
        autoDismiss: true,
      });
    }
    this.setState({ type: dataset.name });

    if (type === 'deposit') return this.depositHandler();
    if (type === 'withdraw') return this.withdrawHandler();

    // getTransaction(this.state);
  };

  depositHandler = () => {
    const { onDeposit, getTransaction } = this.props;
    const { amount, type } = this.state;
    // getTransaction(this.state);
    onDeposit(amount);
    console.log(this.state);
    if (type) {
      getTransaction(this.state);
      this.setState({ ...initState });
    }
  };

  withdrawHandler = () => {
    const { onWithdraw, toastManager, balance, getTransaction } = this.props;
    const { amount, type } = this.state;
    if (balance < amount) {
      return toastManager.add(
        'На счету недостаточно средств для проведения операции!',
        {
          appearance: 'warning',
          autoDismiss: true,
        },
      );
    }
    // getTransaction(this.state);
    onWithdraw(amount);
    if (type) {
      getTransaction(this.state);
      this.setState({ ...initState });
    }
    console.log(this.state);
    // return this.setState({ ...initState });
  };

  render() {
    const { amount, type } = this.state;
    const { getTransaction, balance } = this.props;
    // if (type) {
    //   getTransaction(this.state);
    //   this.setState({ ...initState });
    // }
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
