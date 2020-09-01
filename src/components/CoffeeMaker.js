import React, { Component } from 'react';

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

export default CoffeeMaker;
