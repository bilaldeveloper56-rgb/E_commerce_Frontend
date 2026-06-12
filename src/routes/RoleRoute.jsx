import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

export default function RoleRoute({ role }) {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading || (isAuthenticated && !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-200">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== role) {
    return (
      <Navigate to={user?.role === "admin" ? "/admin" : "/dashboard"} replace />
    );
  }

  return <Outlet />;
}
