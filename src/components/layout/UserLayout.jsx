import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar.jsx";
import { logout } from "../../redux/slices/authSlice";
import { setSidebarOpen } from "../../redux/slices/uiSlice";
import { Menu } from "lucide-react";

const items = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/products", label: "Products" },
  { path: "/dashboard/orders", label: "Orders" },
  { path: "/dashboard/profile", label: "Profile" },
  { path: "/dashboard/settings", label: "Settings" },
];

export default function UserLayout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      {/* Mobile Top Navbar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-4 py-4 lg:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(setSidebarOpen(true))}
            className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition"
          >
            <Menu className="h-6 w-6" />
          </button>
          <span className="font-bold text-slate-900">User Panel</span>
        </div>
        <span className="text-xs font-semibold text-sky-600 bg-sky-50 border border-sky-100 px-3 py-1 rounded-full uppercase tracking-wider">
          {user?.role || "user"}
        </span>
      </header>

      {/* Sidebar Backdrop Overlay on Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => dispatch(setSidebarOpen(false))}
        />
      )}

      <Sidebar items={items} title="User Panel" subtitle="User Menu" />
      <main className="min-h-screen p-4 sm:p-6 lg:p-8 lg:ml-[280px] transition-all duration-300">
        <Outlet />
      </main>
    </div>
  );
}
