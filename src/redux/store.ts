import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import cartReducer from './slices/cartSlice';
import filterReducer from './slices/filterSlice';
import pizzaReducer from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pizza: pizzaReducer,
    cart: cartReducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()