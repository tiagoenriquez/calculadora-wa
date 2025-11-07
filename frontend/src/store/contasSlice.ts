import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Conta from "../models/Conta";

interface contasSlice {
  contas: Conta[];
}

const initialState: contasSlice = {
  contas: [],
}

const contasSlice = createSlice({
  name: 'contas',
  initialState,
  reducers: {
    addConta: (state, action: PayloadAction<Conta>) => {
      const conta = action.payload;
      conta.id = state.contas.length + 1;
      state.contas.push(conta);
      if (state.contas.length > 7) {
        state.contas.splice(0, 1);
      }
    },
  },
});

export const { addConta } = contasSlice.actions;
export default contasSlice.reducer;

