import React from 'react';

const Balance = ({ balance, income, expenses }) => {
  return (
    <section>
      <span>⬆{income}$</span>
      <span>⬇{expenses}$</span>
      <span>{`Balance: ${balance}`}</span>
    </section>
  );
};

export default Balance;
