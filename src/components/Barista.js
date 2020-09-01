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
    const [coffee] = orders;
    const orderTimeMilliseconds = coffees[coffee] * 1000;
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
    const {
      coffees,
      orders: [coffee],
    } = this.props;
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

export default Barista;
