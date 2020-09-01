import React, { Component } from 'react';
import Menu from './components/Menu';
import CoffeeQueue from './components/CoffeeQueue';
import Barista from './components/Barista';
import './App.css';

const FINISHED_ORDER_EXPIRATION = 5000; // msecs

// coffee types and number of seconds it takes to brew each one
const coffees = {
  mocha: 1,
  chai: 2,
  latte: 4,
  matcha: 5,
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      orders: [],
      finished: [],
    };
    this.finishedTimerIds = [];
  }

  addOrder = event => {
    const { name: coffee } = event.target;
    this.setState({ orders: [...this.state.orders, coffee] });
  };

  finishOrder = freeUpBarista => {
    const moveOrderToFinished = ({
      orders: [finishedOrder, ...remainingOrders],
    }) => ({
      orders: remainingOrders,
      finished: [...this.state.finished, finishedOrder],
    });

    this.setState(moveOrderToFinished, () => {
      freeUpBarista();
      this.expireOrder();
    });
  };

  expireOrder = () => {
    this.finishedTimerIds.push(
      setTimeout(() => {
        this.finishedTimerIds.shift();
        this.setState(({ finished: [_, ...remainingFinishedOrders] }) => ({
          finished: remainingFinishedOrders,
        }));
      }, FINISHED_ORDER_EXPIRATION)
    );
  };

  componentWillUnmount() {
    this.finishedTimerIds.forEach(clearTimeout);
  }

  render() {
    return (
      <div>
        <h1>Hello Coffee Lovers!</h1>
        <Barista
          coffees={coffees}
          orders={this.state.orders}
          finishOrder={this.finishOrder}
        />
        <Menu coffees={coffees} addOrder={this.addOrder} />
        <CoffeeQueue title="Orders" orders={this.state.orders} />
        <CoffeeQueue title="Finished" orders={this.state.finished} />
      </div>
    );
  }
}

export default App;
