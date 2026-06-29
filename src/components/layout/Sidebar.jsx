import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSidebarOpen } from "../../redux/slices/uiSlice";
import { X } from "lucide-react";

export default function Sidebar({
  items,
  title = "Dashboard",
  subtitle = "Navigation",
}) {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-full max-w-[280px] overflow-y-auto bg-white border-r border-slate-200 p-6 text-slate-900 z-50 transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-10 relative flex items-center justify-between">
        <div>
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
          <p className="text-xs uppercase tracking-[0.35em] text-indigo-400 font-semibold">
            {subtitle}
          </p>
          <h2 className="mt-3 text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            {title}
          </h2>
        </div>
        <button
          onClick={() => dispatch(setSidebarOpen(false))}
          className="lg:hidden rounded-xl p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 active:scale-95 transition"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => dispatch(setSidebarOpen(false))}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border border-indigo-200 shadow-sm translate-x-1"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 hover:translate-x-1"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
