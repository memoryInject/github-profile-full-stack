import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from '../Header';
import { store } from '../../app/store';

test('renders Header, must have Github Profile text', () => {
  render(
    <Provider store={store}>
      <Router>
        <Header />
      </Router>
    </Provider>
  );

  expect(screen.getByText('Github Profile')).toBeInTheDocument();
});
