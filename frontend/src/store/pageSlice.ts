import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PageSlice {
  page: string;
}

const initialState: PageSlice = {
  page: "home",
}

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    storePage: (state, action: PayloadAction<string>) => {
      state.page = action.payload;
    },
  },
});

export const { storePage } = pageSlice.actions;
export default pageSlice.reducer;
