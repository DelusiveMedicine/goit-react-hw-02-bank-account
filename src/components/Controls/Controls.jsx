import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Controls extends Component {
  state = { value: 0 };

  changeHandler = ({ target }) => {
    const { value } = target;
    const valueNumber = Number(value);
    this.setState({ value: valueNumber });
  };

  clickHandler = ({ target }) => {
    const { onDeposit, onWithdraw, toastManager } = this.props;
    const { dataset } = target;
    const { value } = this.state;
    if (!value)
      toastManager.add('Введите сумму для проведения операции!', {
        appearance: 'warning',
        autoDismiss: true,
      });
    if (dataset.name === 'deposit') onDeposit(value);
    if (dataset.name === 'withdraw') onWithdraw(value);
  };

  render() {
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
  toastManager: PropTypes.func.isRequired,
};

export default Controls;
