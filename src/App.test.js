import { render, screen } from '@testing-library/react';
import App from './App';

test('renders RSVP link', () => {
  render(<App />);
  const mainActionElement = screen.getByText(/RSVP/i);
  expect(mainActionElement).toBeInTheDocument();
});
