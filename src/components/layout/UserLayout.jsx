import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar.jsx";
import { logout } from "../../redux/slices/authSlice";

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

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <Sidebar items={items} title="User Panel" subtitle="User Menu" />
      <main className="ml-[280px] min-h-screen p-6 lg:p-8">
        <header className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              User dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              {items.find((item) => item.path === location.pathname)?.label ||
                "Dashboard"}
            </h1>
            <p className="mt-2 text-slate-400">
              Welcome back, {user?.name || "User"}. Browse your account and
              available products.
            </p>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
