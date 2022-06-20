import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/welcome/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('testit', () => {
  expect(JSON.stringify(0 * -1)).toEqual(JSON.stringify(0));
});
