import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      const findCartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      ); // Find the product in the cart items array

      if (findCartItem) {
        findCartItem.quantity = findCartItem.quantity + 1; // Increase the quantity of the product by 1
        // Add the product to the cart items array in the state
      } else {
        state.cartItems.push(action.payload); // Add the product to the cart items array in the state
      }
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;
