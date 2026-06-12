import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpen: true,
  mobileDrawerOpen: false,
  globalLoading: false,
  toasts: [], // { id, message, type: 'success' | 'error' | 'info' }
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileDrawer: (state) => {
      state.mobileDrawerOpen = !state.mobileDrawerOpen;
    },
    setMobileDrawerOpen: (state, action) => {
      state.mobileDrawerOpen = action.payload;
    },
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
    addToast: (state, action) => {
      const { message, type = "info" } = action.payload;
      const id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
      state.toasts.push({ id, message, type });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileDrawer,
  setMobileDrawerOpen,
  setGlobalLoading,
  addToast,
  removeToast,
} = uiSlice.actions;

// Helper thunk to trigger a toast that auto-removes after 4 seconds
export const showToast = (message, type = "info") => (dispatch) => {
  const toastAction = addToast({ message, type });
  dispatch(toastAction);
  
  // Extract generated id to schedule removal
  const toastId = toastAction.payload.id;
  setTimeout(() => {
    dispatch(removeToast(toastId));
  }, 4000);
};

export default uiSlice.reducer;
