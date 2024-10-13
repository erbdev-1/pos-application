import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.cartItems.push(action.payload); // Add the product to the cart items array in the state
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
