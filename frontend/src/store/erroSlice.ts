import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ErroSlice {
  erro: string;
}

const initialState: ErroSlice = {
  erro: "",
}

const erroSlice = createSlice({
  name: 'erro',
  initialState,
  reducers: {
    storeErro: (state, action: PayloadAction<string>) => {
      state.erro = action.payload;
    },
  },
});

export const { storeErro } = erroSlice.actions;
export default erroSlice.reducer;
