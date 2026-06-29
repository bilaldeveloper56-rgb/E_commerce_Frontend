import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice";
import uiReducer from "./slices/uiSlice";
import userReducer from "./slices/userSlice";
import notificationReducer from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    ui: uiReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export default store;
