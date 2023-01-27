import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const CLIENT_ID = 'a3052da166fd96e7f027';

const access = localStorage.getItem('access') ? true : false;

interface AuthState {
  access: boolean;
  clientId: string;
}

const initialState: AuthState = {
  access,
  clientId: CLIENT_ID,
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
    }
  }
});

export const { setAccess } = authSlice.actions;
export default authSlice.reducer;
