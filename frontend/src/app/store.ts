import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import repoReducer from '../features/repo/repoSlice';
import { apiSlice } from '../features/auth/authAPISlice';
import { profileApiSlice } from '../features/profile/profileAPISlice';
import { repoApiSlice } from '../features/repo/repoAPISlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    repo: repoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [profileApiSlice.reducerPath]: profileApiSlice.reducer,
    [repoApiSlice.reducerPath]: repoApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(profileApiSlice.middleware)
      .concat(repoApiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
