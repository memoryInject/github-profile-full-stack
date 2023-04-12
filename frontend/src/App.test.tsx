import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

// Mock few components which is tested seperately
jest.mock('./screens/HomeScreen', () => () => {
  return <h1>HomeScreen</h1>;
});


test('renders HomeScreen', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(screen.getByText('HomeScreen')).toBeInTheDocument();
});
