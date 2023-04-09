import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationInfo {
  totalPage: number;
  perPage: number;
  page: number;
}

const initialState: PaginationInfo = {
  totalPage: 0,
  perPage: 5,
  page: 1,
};

const repoSlice = createSlice({
  name: 'repo',
  initialState,
  reducers: {
    setTotalPage(state, action: PayloadAction<number>) {
      state.totalPage = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    }
  }
});

export const { setPage, setTotalPage } = repoSlice.actions;
export default repoSlice.reducer;
