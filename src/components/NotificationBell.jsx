import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../redux/slices/notificationSlice";

// ─── Bell SVG ────────────────────────────────────────────────────────────────
function BellIcon({ hasUnread }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.8}
      stroke="currentColor"
      className={`w-6 h-6 transition-all duration-300 ${
        hasUnread ? "animate-[wiggle_0.6s_ease-in-out]" : ""
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
      />
    </svg>
  );
}

// ─── Time helper ─────────────────────────────────────────────────────────────
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

// ─── Single notification row ──────────────────────────────────────────────────
function NotifRow({ notif, onRead, variant }) {
  const isLight = variant === "light";

  const typeIcon =
    notif.type === "new_order" ? "🛒" : "✅";

  return (
    <button
      onClick={() => !notif.isRead && onRead(notif._id)}
      className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group
        ${
          notif.isRead
            ? isLight
              ? "opacity-50 hover:opacity-70"
              : "opacity-40 hover:opacity-60"
            : isLight
            ? "bg-indigo-50 hover:bg-indigo-100"
            : "bg-white/5 hover:bg-white/10"
        }`}
    >
      {/* icon */}
      <span className="text-xl shrink-0 mt-0.5">{typeIcon}</span>

      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-snug ${
            notif.isRead
              ? isLight
                ? "text-slate-500"
                : "text-slate-400"
              : isLight
              ? "text-slate-800 font-medium"
              : "text-white font-medium"
          }`}
        >
          {notif.message}
        </p>
        <p
          className={`mt-0.5 text-xs ${
            isLight ? "text-slate-400" : "text-slate-500"
          }`}
        >
          {timeAgo(notif.createdAt)}
        </p>
      </div>

      {/* unread dot */}
      {!notif.isRead && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
      )}
    </button>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
/**
 * NotificationBell
 * @param {"light"|"dark"} variant  - "light" for light dashboards, "dark" for dark ones
 */
export default function NotificationBell({ variant = "light" }) {
  const dispatch = useDispatch();
  const { notifications, unreadCount, loading } = useSelector(
    (state) => state.notification
  );
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  // ── Initial fetch + poll every 30 s ────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) return;

    dispatch(fetchNotifications());

    const interval = setInterval(() => {
      dispatch(fetchNotifications());
    }, 30000);

    return () => clearInterval(interval);
  }, [dispatch, isAuthenticated]);

  // ── Close dropdown on outside click ────────────────────────────────────────
  useEffect(() => {
    function handleClick(e) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleRead = (id) => {
    dispatch(markNotificationRead(id));
  };

  const handleMarkAll = () => {
    dispatch(markAllNotificationsRead());
  };

  const isLight = variant === "light";

  return (
    <div className="relative">
      {/* ── Bell button ── */}
      <button
        ref={buttonRef}
        id="notification-bell-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Notifications"
        className={`relative flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 focus:outline-none
          ${
            isLight
              ? "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300 shadow-sm"
              : "border border-slate-700/50 bg-slate-800/60 text-slate-300 hover:bg-slate-700/60"
          }`}
      >
        <BellIcon hasUnread={unreadCount > 0} />

        {/* Badge */}
        {unreadCount > 0 && (
          <span
            className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 flex items-center justify-center
              rounded-full bg-gradient-to-br from-red-500 to-rose-500 text-white text-[10px] font-bold
              px-1 shadow-lg shadow-red-500/30 ring-2 ring-white animate-[pop_0.3s_ease-out]"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* ── Dropdown panel ── */}
      {open && (
        <div
          ref={panelRef}
          id="notification-panel"
          className={`absolute right-0 z-50 mt-3 w-80 sm:w-96 rounded-3xl shadow-2xl overflow-hidden
            border transition-all duration-200 origin-top-right
            ${
              isLight
                ? "bg-white border-slate-200 shadow-slate-200/60"
                : "bg-slate-900 border-slate-700/60 shadow-black/50"
            }`}
          style={{ animation: "slideDown 0.18s ease-out" }}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between px-5 py-4 border-b
              ${isLight ? "border-slate-100" : "border-slate-700/50"}`}
          >
            <div className="flex items-center gap-2">
              <h3
                className={`font-semibold text-sm ${
                  isLight ? "text-slate-900" : "text-white"
                }`}
              >
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span
                  className="rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold px-2 py-0.5"
                >
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAll}
                className={`text-xs font-medium transition-colors
                  ${
                    isLight
                      ? "text-indigo-600 hover:text-indigo-700"
                      : "text-indigo-400 hover:text-indigo-300"
                  }`}
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notification list */}
          <div className="max-h-[22rem] overflow-y-auto p-2 space-y-1">
            {loading && notifications.length === 0 && (
              <p
                className={`text-center py-8 text-sm ${
                  isLight ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Loading…
              </p>
            )}

            {!loading && notifications.length === 0 && (
              <div className="flex flex-col items-center py-10 gap-2">
                <span className="text-3xl">🔔</span>
                <p
                  className={`text-sm ${
                    isLight ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  No notifications yet
                </p>
              </div>
            )}

            {notifications.map((notif) => (
              <NotifRow
                key={notif._id}
                notif={notif}
                onRead={handleRead}
                variant={variant}
              />
            ))}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div
              className={`px-5 py-3 border-t text-center
                ${isLight ? "border-slate-100" : "border-slate-700/50"}`}
            >
              <p
                className={`text-xs ${
                  isLight ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {notifications.length} notification
                {notifications.length !== 1 ? "s" : ""} total
              </p>
            </div>
          )}
        </div>
      )}

      {/* Inline keyframe styles */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          15% { transform: rotate(12deg); }
          30% { transform: rotate(-10deg); }
          45% { transform: rotate(8deg); }
          60% { transform: rotate(-6deg); }
          75% { transform: rotate(3deg); }
        }
        @keyframes pop {
          0% { transform: scale(0.5); opacity: 0; }
          80% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes slideDown {
          0% { opacity: 0; transform: translateY(-8px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
