import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import NotificationBell from "../components/NotificationBell";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-stone-50 text-slate-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent font-bold">
              Admin Dashboard
            </p>
            <h1 className="text-4xl font-semibold">
              Welcome back, {user?.name || "Admin"}
            </h1>
            <p className="mt-2 text-slate-400">
              View live analytics, manage products, and keep the platform running smoothly.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <NotificationBell variant="light" />
            <Link
              to="/admin/products"
              className="cursor-pointer inline-flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-300"
            >
              Manage products
            </Link>
            <button
              onClick={() => {
                dispatch(logout());
                toast.success("Logged out successfully");
              }}
              className="cursor-pointer inline-flex items-center justify-center rounded-full border border-slate-200 bg-white backdrop-blur-md px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white backdrop-blur-xl p-8 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:border-indigo-500/30">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl"></div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
                  Performance
                </p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-900">
                  Live analytics
                </h2>
              </div>
              <span className="rounded-2xl bg-stone-100 px-3 py-2 text-sm text-slate-500">
                Updated now
              </span>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-slate-100 bg-stone-50 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                  Active users
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {user?.role === "admin" ? 218 : 0}
                </p>
                <p className="mt-2 text-slate-400">
                  Currently viewing platform usage
                </p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-stone-50 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                  Total products
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {/* placeholder until API loaded */}120
                </p>
                <p className="mt-2 text-slate-400">
                  Inventory count across all categories
                </p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-stone-50 p-5">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
                  New signups
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">
                  {/* placeholder */}14
                </p>
                <p className="mt-2 text-slate-400">Users joined this week</p>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white backdrop-blur-xl p-8 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:border-purple-500/30">
            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl"></div>
            <h2 className="text-xl font-semibold text-slate-900">
              Account overview
            </h2>
            <p className="mt-2 text-slate-400">
              Your admin profile, role, and quick links to product and user
              controls.
            </p>
            <div className="mt-6 space-y-4">
              <div className="rounded-3xl border border-slate-100 bg-stone-50 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Name
                </p>
                <p className="mt-2 text-slate-900">{user?.name || "Admin"}</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-stone-50 p-5">
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  Email
                </p>
                <p className="mt-2 text-slate-900">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  to="/admin/users"
                  className="cursor-pointer rounded-2xl bg-stone-50 border border-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-100 transition"
                >
                  View users
                </Link>
                <Link
                  to="/admin/settings"
                  className="cursor-pointer rounded-2xl bg-stone-50 border border-slate-200 px-4 py-3 text-slate-700 hover:bg-slate-100 transition"
                >
                  Update settings
                </Link>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
