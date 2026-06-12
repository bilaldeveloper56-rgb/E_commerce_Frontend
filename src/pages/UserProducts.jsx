import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";

export default function UserProducts() {
  const dispatch = useDispatch();
  const { products, categories, loading, error } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.items);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ limit: 18, search, category, sort }));
  }, [dispatch, search, category, sort]);

  const inCartCount = (productId) => {
    return cartItems.find((item) => item._id === productId)?.quantity || 0;
  };

  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 transition-all duration-300">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Available Products
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Browse products and add items to your order with one click.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products"
              className="w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900"
            >
              <option value="desc">Price: high to low</option>
              <option value="asc">Price: low to high</option>
            </select>
          </div>
        </div>
      </div>

      {loading && <p className="text-slate-700">Loading products...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={product._id}
            className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 transition-all duration-300 hover:border-sky-500/40 hover:-translate-y-1 hover:shadow-sky-500/10"
          >
            <div className="overflow-hidden rounded-2xl relative">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            </div>
            <div className="mt-5 flex flex-col gap-4 relative z-10">
              <div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 font-medium">
                <span className="text-lg text-sky-400">${product.price}</span>
                <span className="text-sm text-slate-600 bg-stone-50 border border-slate-200 px-3 py-1 rounded-full">{product.stock} in stock</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => dispatch(addToCart(product))}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] transition-all duration-300 w-full sm:w-auto"
                >
                  Order product
                </button>
                {inCartCount(product._id) > 0 && (
                  <span className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                    In cart: {inCartCount(product._id)}
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
