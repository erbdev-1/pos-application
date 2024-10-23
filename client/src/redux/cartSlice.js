import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).cartItems
      : [],
    total: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")).total
      : 0,
    tax: 20,
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

      state.total += action.payload.price; // Increase the total by the price of the product
    },
    deleteProduct: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      state.total -= action.payload.price * action.payload.quantity; // Decrease the total by the price of the product multiplied by the quantity of the product
    },
    increaseQuantity: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem.quantity += 1;
      state.total += cartItem.price; // Increase the total by the price of the product
    },
    decreaseQuantity: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      cartItem.quantity -= 1;
      if (cartItem.quantity === 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      }
      state.total -= cartItem.price; // Decrease the total by the price of the product
    },
    reset: (state) => {
      state.cartItems = [];
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  deleteProduct,
  increaseQuantity,
  decreaseQuantity,
  reset,
} = cartSlice.actions;
export default cartSlice.reducer;
