import { configureStore } from '@reduxjs/toolkit';
import contaReducer from './contaSlice';
import contasReducer from './contasSlice';
import erroReducer from './erroSlice';
import pageReducer from './pageSlice';

export const store = configureStore({
  reducer: {
    conta: contaReducer,
    contas: contasReducer,
    erro: erroReducer,
    page: pageReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
