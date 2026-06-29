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
        <Outlet />
      </main>
    </div>
  );
}
