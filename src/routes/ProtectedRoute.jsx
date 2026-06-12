import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute() {
  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.auth,
  );

  // While checking auth on first load or awaiting user data
  if (loading || (isAuthenticated && !user)) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center"
        style={{
          background:
            "linear-gradient(135deg, #020817 0%, #0f172a 50%, #1a1033 100%)",
        }}
      >
        <div className="relative flex flex-col items-center gap-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
            <Loader2 className="absolute inset-0 m-auto h-7 w-7 text-indigo-400 animate-spin" />
          </div>
          <p className="text-slate-400 text-sm font-medium tracking-widest uppercase">
            Authenticating...
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
