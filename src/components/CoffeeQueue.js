import React from 'react';

const CoffeeQueue = ({ title, orders }) => (
  <div className="container" data-testid={title}>
    <h1 className="title">{title}</h1>
    <ul>
      {orders.map((order, index) => (
        <li key={`${title}_${order}_${index}`} className="item">
          <span role="img" aria-label="coffee cup">
            ☕️
          </span>{' '}
          {order}
        </li>
      ))}
    </ul>
  </div>
);

export default CoffeeQueue;
