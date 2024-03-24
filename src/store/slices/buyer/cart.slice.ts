import { createSlice } from '@reduxjs/toolkit';

interface BuyerCartState {
  id?: number;
  image: string;
  title: string;
  shop: string;
  weight: string;
  count: number;
  price: string;
  perPiece: string;
  inStock: number;
}

const initialState: BuyerCartState[] = [];

export const cartSlice = createSlice({
  name: 'buyer/cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let arr = state.filter((product) => product.id !== action.payload.id);

      return [...arr, action.payload];
    },

    removeFromCart: (state, action) => {
      let filtered = state.filter((product) => product.id !== action.payload.id);

      return filtered;
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
