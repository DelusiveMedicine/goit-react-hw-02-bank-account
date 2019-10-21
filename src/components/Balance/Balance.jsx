import React from 'react';

const Balance = ({ balance }) => {
  return (
    <section>
      <span>⬆️2000$</span>
      <span>⬇️1000$</span>
      <span>{`Balance: ${balance}`}</span>
    </section>
  );
};

export default Balance;
