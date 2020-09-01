import React from 'react';
import './App.css';

// drink data
const coffees = {
  mocha: 1,
  chai: 2,
  latte: 4,
  matcha: 5,
};

const { Component } = React;

class CoffeeMaker extends Component {
  constructor({ prepTimeSeconds }) {
    super();
    this.state = {
      remainingSeconds: prepTimeSeconds,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState(({ remainingSeconds }) => ({
        remainingSeconds: remainingSeconds - 1,
      }));
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <span>
        {this.props.coffee} will be ready in{' '}
        {'⏰'.repeat(this.state.remainingSeconds)}
        {this.state.remainingSeconds} sec
        {this.state.remainingSeconds === 1 ? '' : 's'}
      </span>
    );
  }
}

class Barista extends Component {
  constructor() {
    super();
    this.state = {
      baristaBusy: false,
    };
  }

  componentDidUpdate() {
    if (!this.state.baristaBusy && this.props.orders.length > 0) {
      this.makeCoffee();
    }
  }

  makeCoffee = () => {
    this.setState({ baristaBusy: true });
    const [coffee] = this.props.orders;
    const orderTimeMilliseconds = coffees[coffee] * 1000;
    this.preparationTimerId = setTimeout(() => {
      this.props.finishOrder(this.freeUpBarista);
    }, orderTimeMilliseconds);
  };

  freeUpBarista = () => {
    this.setState({ baristaBusy: false });
  };

  componentWillUnmount() {
    if (this.preparationTimerId) {
      clearTimeout(this.preparationTimerId);
    }
  }

  render() {
    const [coffee] = this.props.orders;
    return (
      <p className="barista">
        Barista:{' '}
        <span className="status">
          {this.state.baristaBusy ? (
            <CoffeeMaker coffee={coffee} prepTimeSeconds={coffees[coffee]} />
          ) : (
            <span>
              idle{' '}
              <span role="img" aria-label="sleeping">
                😴
              </span>
            </span>
          )}
        </span>
      </p>
    );
  }
}

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
      }, 3000)
    );
  };

  componentWillUnmount() {
    this.finishedTimerIds.forEach(clearTimeout);
  }

  render() {
    return (
      <div>
        <h1>Hello Coffee Lovers!</h1>
        <Barista orders={this.state.orders} finishOrder={this.finishOrder} />
        <Menu coffees={coffees} addOrder={this.addOrder} />
        <CoffeeQueue title="Orders" orders={this.state.orders} />
        <CoffeeQueue title="Finished" orders={this.state.finished} />
      </div>
    );
  }
}

const CoffeeQueue = ({ title, orders }) => (
  <div className="container">
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

class Menu extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="title">Menu</h1>
        <ul>
          {Object.entries(coffees).map(([coffee, _]) => (
            <li key={coffee} className="item">
              <button onClick={this.props.addOrder} name={coffee}>
                {coffee}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
