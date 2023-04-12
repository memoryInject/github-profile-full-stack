import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import { reposData } from '../../setupTests';
import Repo from '../repo/Repo';


test('Show user name when successfully render Profile', async () => {
  render(
    <Provider store={store}>
      <Repo />
    </Provider>
  );

  await waitFor(() => screen.findAllByText(reposData.repos[0].name));
  expect(screen.getByText('Repos')).toBeInTheDocument();
});
