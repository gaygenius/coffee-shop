import React, { Component } from 'react';
import CoffeeMaker from './CoffeeMaker';

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
    const { orders, coffees, finishOrder } = this.props;
    const orderTimeMilliseconds = coffees[orders[0]] * 1000;
    this.preparationTimerId = setTimeout(() => {
      finishOrder(this.freeUpBarista);
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
    const { coffees, orders } = this.props;
    return (
      <p className="barista">
        Barista:{' '}
        <span className="status">
          {this.state.baristaBusy ? (
            <CoffeeMaker
              coffee={orders[0]}
              prepTimeSeconds={coffees[orders[0]]}
            />
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

export default Barista;
