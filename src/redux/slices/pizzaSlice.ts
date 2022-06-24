import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzaType } from '../../@types/types';
import { RootStateType } from '../store';
import { CartPizzaType } from './cartSlice';

type FetchPizzasParams = {
  categoryQuery: string
  sortQuery: string
  searchQuery: string
  currentPage: number
}

export const fetchPizzas = createAsyncThunk<PizzaType[], FetchPizzasParams>('pizza/fetchPizzas', async (params) => {
  const { categoryQuery, sortQuery, searchQuery, currentPage } = params;
  const { data } = await axios.get<PizzaType[]>(
    `https://629f1cee8b939d3dc28f8b94.mockapi.io/items?${categoryQuery}&page=${currentPage}&limit=4${sortQuery}${searchQuery}`,
  );
  return data;
});

interface PizzaSliceState {
  pizzas: PizzaType[]
  status: 'loading' | 'success' | 'error'
}

const initialState: PizzaSliceState = {
  pizzas: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.pizzas = [];
      state.status = 'loading';
    })
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.pizzas = action.payload;
      state.status = 'success';
    })
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.pizzas = [];
      state.status = 'error';
    })
  }
});

export const getPizzaSelector = (state: RootStateType) => state.pizza;
export const getPizzaByIdSelector = (id: number) => (state: RootStateType) => {
  const pizza = state.cart.products.find((pizza: CartPizzaType) => pizza.id === id);
  return pizza;
};

export default pizzaSlice.reducer;
