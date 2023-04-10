import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const access = localStorage.getItem('access') ? true : false;

interface AuthState {
  access: boolean;
}

const initialState: AuthState = {
  access,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccess(state, action: PayloadAction<boolean>) {
      state.access = action.payload;
      if (action.payload === true) {
        localStorage.setItem('access', 'true');
      } else {
        localStorage.removeItem('access');
      }
    },
  },
});

export const { setAccess } = authSlice.actions;
export default authSlice.reducer;
