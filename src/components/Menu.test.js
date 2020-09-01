import React from 'react';
import { render } from '@testing-library/react';
import Menu from './Menu';

test('renders a menu with a button for each coffee', () => {
  const fancyCoffees = { pumpkin_latte: 6, frappuccino: 10 };
  const { getByText, getByRole } = render(<Menu coffees={fancyCoffees} />);
  expect(getByText(/Menu/i)).toBeInTheDocument();
  expect(getByRole('button', { name: 'pumpkin_latte' })).toBeInTheDocument();
  expect(getByRole('button', { name: 'frappuccino' })).toBeInTheDocument();
});
