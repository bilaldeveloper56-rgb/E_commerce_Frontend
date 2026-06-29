import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import notificationService from "../../services/notificationService";

// ─── Async Thunks ────────────────────────────────────────────────────────────

export const fetchNotifications = createAsyncThunk(
  "notification/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const data = await notificationService.getNotifications();
      return data; // { data: [...], unreadCount: N }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch notifications"
      );
    }
  }
);

export const markNotificationRead = createAsyncThunk(
  "notification/markRead",
  async (id, { rejectWithValue }) => {
    try {
      await notificationService.markRead(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to mark as read"
      );
    }
  }
);

export const markAllNotificationsRead = createAsyncThunk(
  "notification/markAllRead",
  async (_, { rejectWithValue }) => {
    try {
      await notificationService.markAllRead();
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to mark all as read"
      );
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Fetch notifications ──────────────────────────────────────────────
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.data || [];
        state.unreadCount = action.payload.unreadCount || 0;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Mark single notification as read ─────────────────────────────────
      .addCase(markNotificationRead.fulfilled, (state, action) => {
        const id = action.payload;
        const notif = state.notifications.find((n) => n._id === id);
        if (notif && !notif.isRead) {
          notif.isRead = true;
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })

      // ── Mark all notifications as read ───────────────────────────────────
      .addCase(markAllNotificationsRead.fulfilled, (state) => {
        state.notifications.forEach((n) => {
          n.isRead = true;
        });
        state.unreadCount = 0;
      });
  },
});

export const { clearNotificationError } = notificationSlice.actions;
export default notificationSlice.reducer;
