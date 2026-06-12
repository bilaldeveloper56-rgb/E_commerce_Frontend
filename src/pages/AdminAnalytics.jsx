import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminProducts } from "../redux/slices/productSlice";
import { fetchAllUsers } from "../redux/slices/userSlice";

export default function AdminAnalytics() {
  const dispatch = useDispatch();
  const {
    totalProducts,
    adminProducts,
    loading: productsLoading,
  } = useSelector((state) => state.product);
  const { users, loading: usersLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchAdminProducts({ limit: 20 }));
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/40 transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl transition-all duration-500 group-hover:bg-indigo-500/20"></div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Products
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white">
            {productsLoading ? "..." : totalProducts}
          </h2>
          <p className="mt-2 text-slate-400">
            Total admin-visible product records
          </p>
        </article>
        <article className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/40 transition-all duration-300 hover:border-purple-500/40 hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-purple-500/10 blur-2xl transition-all duration-500 group-hover:bg-purple-500/20"></div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Users
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white">
            {usersLoading ? "..." : users.length}
          </h2>
          <p className="mt-2 text-slate-400">Registered users in the system</p>
        </article>
        <article className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/40 transition-all duration-300 hover:border-sky-500/40 hover:-translate-y-1">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-sky-500/10 blur-2xl transition-all duration-500 group-hover:bg-sky-500/20"></div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Active products
          </p>
          <h2 className="mt-4 text-4xl font-semibold text-white">
            {adminProducts.length}
          </h2>
          <p className="mt-2 text-slate-400">
            Products currently loaded from backend
          </p>
        </article>
      </div>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
          <h3 className="text-xl font-semibold text-white">
            Product breakdown
          </h3>
          <p className="mt-2 text-slate-400">
            Recent admin product listings show key metrics.
          </p>
          <ul className="mt-4 space-y-3 text-slate-300">
            {adminProducts.slice(0, 5).map((product) => (
              <li
                key={product._id}
                className="group rounded-2xl border border-slate-700/50 bg-slate-950/50 p-5 transition-all duration-300 hover:border-indigo-500/30 hover:bg-slate-900/80 hover:-translate-x-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-slate-200 group-hover:text-indigo-300 transition-colors">{product.title}</span>
                  <span className="text-sm text-slate-400">
                    ${product.price}
                  </span>
                </div>
                <p className="mt-2 text-slate-500 truncate">
                  {product.description}
                </p>
              </li>
            ))}
          </ul>
        </article>

        <article className="relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/50 backdrop-blur-xl p-8 shadow-2xl shadow-black/40">
          <h3 className="text-xl font-semibold text-white">User activity</h3>
          <p className="mt-2 text-slate-400">
            Latest registered users from backend.
          </p>
          <ul className="mt-4 space-y-3 text-slate-300">
            {users.slice(0, 5).map((user) => (
              <li
                key={user._id}
                className="group rounded-2xl border border-slate-700/50 bg-slate-950/50 p-5 transition-all duration-300 hover:border-purple-500/30 hover:bg-slate-900/80 hover:-translate-x-1"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-medium text-slate-200 group-hover:text-purple-300 transition-colors">{user.name}</span>
                  <span className="text-sm text-slate-400">{user.role}</span>
                </div>
                <p className="mt-2 text-slate-500">{user.email}</p>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </div>
  );
}
