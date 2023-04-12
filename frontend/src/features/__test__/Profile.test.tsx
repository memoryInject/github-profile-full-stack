import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { profileData } from '../../setupTests';
import Profile from '../profile/Profile';


test('Show user name when successfully render Profile', async () => {
  render(
    <Provider store={store}>
      <Profile />
    </Provider>
  );

  await waitFor(() => screen.findAllByText(profileData.login));
  expect(screen.getByText(profileData.login)).toBeInTheDocument();
  expect(screen.getByText(profileData.name)).toBeInTheDocument();
  expect(screen.getByText(profileData.location)).toBeInTheDocument();
});
