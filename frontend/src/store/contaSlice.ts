import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Conta from "../models/Conta";

interface contaSlice {
  conta: Conta;
}

const initialState: contaSlice = {
  conta: { id: 0, conta: "", resultado: "" },
}

const contaSlice = createSlice({
  name: 'conta',
  initialState,
  reducers: {
    storeConta: (state, action: PayloadAction<Conta>) => {
      state.conta = action.payload;
    },
  },
});

export const { storeConta } = contaSlice.actions;
export default contaSlice.reducer;

