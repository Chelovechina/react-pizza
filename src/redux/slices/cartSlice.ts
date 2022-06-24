import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateType } from '../store';

export type CartPizzaType = {
  id: number
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count?: number
}

interface CartSliseState {
  totalPrice: number
  totalProducts: number
  products: CartPizzaType[],
}

const initialState: CartSliseState = {
  totalPrice: 0,
  totalProducts: 0,
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartPizzaType>) => {
      const sameProduct = state.products.find((product) => product.id === action.payload.id);

      if (sameProduct?.count) {
        sameProduct.count++;
      } else {
        state.products.push({ ...action.payload, count: 1 });
      }

      state.totalPrice += action.payload.price;
      state.totalProducts++;
    },
    increaseCount: (state, action: PayloadAction<number>) => {
      state.products.forEach((product) => {
        if (product.id === action.payload) {
          product.count ? product.count++ : product.count = 1;
          state.totalProducts++;
          state.totalPrice += product.price;
        }
      });
    },
    decreaseCount: (state, action: PayloadAction<number>) => {
      state.products.forEach((product) => {
        if (product.id === action.payload) {
          if (product?.count && product.count > 1) {
            product.count--;
            state.totalProducts--;
            state.totalPrice -= product.price;
          }
        }
      });
    },
    removeSameProducts: (state, action: PayloadAction<CartPizzaType>) => {
      state.products = state.products.filter((product) => product.id !== action.payload.id);
      state.totalProducts -= action.payload.count ? action.payload.count : 1;
      state.totalPrice -= action.payload.price * (action.payload.count ? action.payload.count : 1);
    },
    cartClear: (state) => {
      state.products = [];
      state.totalPrice = 0;
      state.totalProducts = 0;
    },
  },
});

export const getCartSelector = (state: RootStateType) => state.cart;

export const { addProduct, increaseCount, decreaseCount, removeSameProducts, cartClear } =
  cartSlice.actions;

export default cartSlice.reducer;
