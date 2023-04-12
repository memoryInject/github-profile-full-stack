import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../app/store';
import Footer from '../Footer';

test('renders Footer, must have  Happy Holidays! text', () => {
  render(
    <Provider store={store}>
      <Router>
        <Footer />
      </Router>
    </Provider>
  );

  expect(screen.getByTestId('test-id')).toBeInTheDocument();
  expect(screen.getByText(/Happy/i)).toBeInTheDocument();
});

