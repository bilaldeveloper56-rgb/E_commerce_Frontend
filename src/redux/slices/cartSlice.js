import { createSlice } from "@reduxjs/toolkit";

const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) return [];
    return JSON.parse(serializedCart);
  } catch (err) {
    return [];
  }
};

const saveCartToStorage = (cartItems) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (err) {
    console.error("Could not save cart to storage", err);
  }
};

const calculateTotals = (cartItems) => {
  const quantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  return { totalQuantity: quantity, totalPrice: Number(total.toFixed(2)) };
};

const initialState = {
  items: loadCartFromStorage(),
  ...calculateTotals(loadCartFromStorage()),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        // Clamp to available stock
        const maxStock = product.stock !== undefined ? product.stock : 99;
        if (existingItem.quantity < maxStock) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({
          _id: product._id,
          title: product.title,
          price: Number(product.price),
          imageUrl: product.imageUrl,
          stock: product.stock,
          quantity: 1,
        });
      }

      // Sync and recalculate
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      
      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      saveCartToStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        const maxStock = item.stock !== undefined ? item.stock : 99;
        item.quantity = Math.max(1, Math.min(quantity, maxStock));
      }

      const totals = calculateTotals(state.items);
      state.totalQuantity = totals.totalQuantity;
      state.totalPrice = totals.totalPrice;
      saveCartToStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      saveCartToStorage([]);
    },
  },
  extraReducers: (builder) => {
    builder.addCase("auth/logout", (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    });
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
