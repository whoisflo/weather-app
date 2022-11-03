import { render, screen } from '@testing-library/react';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const headlineElement = screen.getByText(/Vorhersage/i);
  expect(headlineElement).toBeInTheDocument();
});
