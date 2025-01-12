import { render, screen } from '@testing-library/react';
import App from './App';

test('renders financial data app heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Financial Data Filtering App/i);
  expect(headingElement).toBeInTheDocument();
});
