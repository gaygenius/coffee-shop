import React from 'react';
import { render } from '@testing-library/react';
import CoffeeQueue from './CoffeeQueue';

test('renders a menu with a button for each coffee', () => {
  const { getByText, getByRole } = render(
    <CoffeeQueue title="Finished" orders={['latte', 'chai']} />
  );
  expect(getByText(/Finished/i)).toBeInTheDocument();
  expect(getByText(/latte/i)).toBeInTheDocument();
  expect(getByText(/chai/i)).toBeInTheDocument();
});
