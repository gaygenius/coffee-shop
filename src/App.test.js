import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import App from './App';

jest.useFakeTimers();

test('renders coffee shop', () => {
  const { getByText } = render(<App />);
  expect(getByText(/Coffee Lovers/i)).toBeInTheDocument();
  expect(getByText(/Menu/i)).toBeInTheDocument();
  expect(getByText(/Orders/i)).toBeInTheDocument();
  expect(getByText(/Finished/i)).toBeInTheDocument();
});

test('when clicking on a coffee in the menu, add it to the Orders list', async () => {
  render(<App />);
  fireEvent.click(within(screen.getByTestId('Menu')).getByText('mocha'));
  await within(screen.getByTestId('Orders')).getByText('mocha');
});
