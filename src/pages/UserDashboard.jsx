import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import NotificationBell from "../components/NotificationBell";

export default function UserDashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (

    <div className="min-h-screen bg-stone-50 text-slate-900 p-6">
      <p></p>
              <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent font-bold">
              User Dashboard
            </p>
            <h1 className="text-4xl font-semibold">
              Welcome back, {user?.name || "User"}
            </h1>
            <p className="mt-2 text-slate-400">
              Browse your account and available products.
            </p>
          </div>
          <div className="flex flex-row items-center gap-2 sm:gap-4 overflow-x-auto w-full md:w-auto py-1">
            <div className="shrink-0">
              <NotificationBell variant="light" />
            </div>
            <Link
              to="/dashboard/orders"
              className="cursor-pointer shrink-0 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-105 transition-all duration-300"
            >
              View orders
            </Link>
            <button
              onClick={() => {
                dispatch(logout());
                toast.success("Logged out successfully");
              }}
              className="cursor-pointer shrink-0 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white backdrop-blur-md px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white backdrop-blur-xl p-8 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:border-sky-500/30">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-sky-500/5 blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-slate-900">
                Your profile
              </h2>
              <p className="mt-2 text-slate-400">
                Keep your account info up to date and manage your preferences.
              </p>
              <div className="mt-5 space-y-2 text-sm text-slate-600">
                <p>Name: {user?.name || "—"}</p>
                <p>Email: {user?.email || "—"}</p>
                <p>Role: {user?.role || "user"}</p>
              </div>
              <div className="mt-6">
                <Link
                  to="/dashboard/profile"
                  className="inline-flex items-center justify-center rounded-2xl bg-stone-50 border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:scale-105 transition-all duration-300"
                >
                  Edit profile
                </Link>
              </div>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white backdrop-blur-xl p-8 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:border-indigo-500/30">
            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-xl font-semibold text-slate-900">
                Shopping summary
              </h2>
              <p className="mt-2 text-slate-400">
                Quick access to recent orders and account activity.
              </p>
              <div className="mt-6 grid gap-4">
                <Link
                  to="/dashboard/orders"
                  className="flex items-center justify-center rounded-2xl bg-stone-50 border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:translate-x-2 transition-all duration-300"
                >
                  Order history
                </Link>
                <Link
                  to="/dashboard/profile"
                  className="flex items-center justify-center rounded-2xl bg-stone-50 border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:translate-x-2 transition-all duration-300"
                >
                  Account settings
                </Link>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
}
