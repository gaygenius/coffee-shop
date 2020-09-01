import React, { Component } from 'react';

class Menu extends Component {
  render() {
    const { coffees, addOrder } = this.props;
    return (
      <div className="container">
        <h1 className="title">Menu</h1>
        <ul>
          {Object.entries(coffees).map(([coffee, _]) => (
            <li key={coffee} className="item">
              <button onClick={addOrder} name={coffee}>
                {coffee}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Menu;
