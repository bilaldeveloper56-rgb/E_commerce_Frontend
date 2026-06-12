import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";
import { removeToast } from "../../redux/slices/uiSlice";

const ICONS = {
  success: <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />,
  error: <XCircle className="w-5 h-5 text-red-400    shrink-0" />,
  info: <Info className="w-5 h-5 text-indigo-400 shrink-0" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
};

const TYPE_STYLES = {
  success: "border-emerald-500/40 bg-emerald-500/10",
  error: "border-red-500/40    bg-red-500/10",
  info: "border-indigo-500/40 bg-indigo-500/10",
  warning: "border-amber-500/40  bg-amber-500/10",
};

const PROGRESS_COLORS = {
  success: "bg-emerald-400",
  error: "bg-red-400",
  info: "bg-indigo-400",
  warning: "bg-amber-400",
};

function ToastItem({ toast }) {
  const dispatch = useDispatch();
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  const DURATION = 4000;

  // Progress bar
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / DURATION) * 100);
      setProgress(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => dispatch(removeToast(toast.id)), 320);
  };

  const type = toast.type || "info";

  return (
    <div
      className={`
        toast relative overflow-hidden flex items-start gap-3 w-full max-w-sm
        border rounded-xl px-4 py-3 shadow-2xl
        backdrop-blur-xl bg-slate-900/90
        ${TYPE_STYLES[type] ?? TYPE_STYLES.info}
        transition-all duration-300
        ${
          exiting
            ? "opacity-0 translate-x-full scale-95"
            : "opacity-100 translate-x-0 scale-100 animate-toast-in"
        }
      `}
      role="alert"
    >
      {/* Icon */}
      <span className="mt-0.5">{ICONS[type] ?? ICONS.info}</span>

      {/* Message */}
      <p className="flex-1 text-sm text-slate-100 leading-snug break-words">
        {toast.message}
      </p>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="shrink-0 mt-0.5 p-0.5 rounded-md text-slate-400 hover:text-slate-100
                   hover:bg-slate-700/60 transition-colors duration-150"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar */}
      <div
        className={`absolute bottom-0 left-0 h-0.5 rounded-full transition-all ease-linear ${PROGRESS_COLORS[type] ?? PROGRESS_COLORS.info}`}
        style={{ width: `${progress}%`, transitionDuration: "30ms" }}
      />
    </div>
  );
}

export default function Toast() {
  const toasts = useSelector((state) => state.ui.toasts);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-[9999] flex flex-col-reverse gap-3 items-end pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full max-w-sm">
          <ToastItem toast={toast} />
        </div>
      ))}
    </div>
  );
}
