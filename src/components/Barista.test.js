import React from 'react';
import { render } from '@testing-library/react';
import Barista from './Barista';

test('renders an idle barista when there are no orders', () => {
  const fancyCoffees = { pumpkin_latte: 6, frappuccino: 10 };
  const { getByText } = render(
    <Barista coffees={fancyCoffees} orders={[]} finishOrder={() => {}} />
  );
  expect(getByText(/Barista/i)).toBeInTheDocument();
  expect(getByText(/idle/i)).toBeInTheDocument();
});

test('renders a busy barista when there are orders', async () => {
  const fancyCoffees = { pumpkin_latte: 6, frappuccino: 10 };
  const { getByText, rerender } = render(
    <Barista coffees={fancyCoffees} orders={[]} finishOrder={() => {}} />
  );
  expect(getByText(/Barista/i)).toBeInTheDocument();
  rerender(
    <Barista coffees={fancyCoffees} orders={['mocha']} finishOrder={() => {}} />
  );
  expect(getByText(/will be ready/i)).toBeInTheDocument();
});
