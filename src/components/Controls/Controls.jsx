import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortId from 'shortid';

const date = new Date();
const initState = {
  id: shortId(),
  type: '',
  amount: 0,
  date: date.toLocaleString(),
};

class Controls extends Component {
  state = { value: 0, transaction: initState };

  changeHandler = ({ target }) => {
    const { value } = target;
    const valueNumber = Number(value);
    this.setState(prevState => ({
      value: valueNumber,
      transaction: {
        ...prevState.transaction,
        amount: valueNumber,
      },
    }));
  };

  clickHandler = ({ target }) => {
    const { onDeposit, onWithdraw, toastManager, transactions } = this.props;
    const { dataset } = target;
    const { value, transaction } = this.state;
    if (!value)
      toastManager.add('Введите сумму для проведения операции!', {
        appearance: 'warning',
        autoDismiss: true,
      });
    this.setState(prevState => ({
      transaction: { ...prevState.transaction, type: dataset.name },
    }));

    if (dataset.name === 'deposit') onDeposit(value);
    if (dataset.name === 'withdraw') onWithdraw(value);
    this.setState({ transaction: { ...initState } });
  };

  render() {
    console.log(this.state);
    const { value } = this.state;
    return (
      <section>
        <input
          type="number"
          name="amount"
          value={value}
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

export default Controls;
