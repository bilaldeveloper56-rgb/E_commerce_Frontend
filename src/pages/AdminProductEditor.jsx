import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  fetchAdminProducts,
  removeProduct,
  editProduct,
} from "../redux/slices/productSlice";
import Modal from "../components/ui/Modal.jsx";
import toast from "react-hot-toast";

const initialForm = {
  title: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  image: null,
};

export default function AdminProductEditor() {
  const dispatch = useDispatch();
  const { adminProducts, actionLoading, error } = useSelector(
    (state) => state.product,
  );
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("desc");

  const categories = useMemo(
    () =>
      Array.from(
        new Set(adminProducts.map((item) => item.category).filter(Boolean)),
      ),
    [adminProducts],
  );

  useEffect(() => {
    dispatch(fetchAdminProducts({ limit: 50, search, category, sort }));
  }, [dispatch, search, category, sort]);

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("category", form.category);
    if (form.image) formData.append("image", form.image);

    if (editingId) {
      const res = await dispatch(editProduct({ id: editingId, formData }));
      if (editProduct.fulfilled.match(res)) {
        toast.success("Product updated successfully");
        resetForm();
        setShowModal(false);
        dispatch(fetchAdminProducts({ limit: 50, search, category, sort }));
      } else {
        toast.error(res.payload || "Failed to update product");
      }
    } else {
      const res = await dispatch(addProduct(formData));
      if (addProduct.fulfilled.match(res)) {
        toast.success("Product created successfully");
        resetForm();
        setShowModal(false);
        dispatch(fetchAdminProducts({ limit: 50, search, category, sort }));
      } else {
        toast.error(res.payload || "Failed to create product");
      }
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      title: product.title || "",
      description: product.description || "",
      price: product.price || "",
      stock: product.stock || "",
      category: product.category || "",
      image: null,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const res = await dispatch(removeProduct(id));
      if (removeProduct.fulfilled.match(res)) {
        toast.success("Product deleted successfully");
      } else {
        toast.error(res.payload || "Failed to delete product");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Button */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              Product operations
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">
              Manage your catalog
            </h1>
          </div>
          <button
            type="button"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-400 transition"
          >
            + Add new product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Filters</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="text-sm text-slate-400">Search</label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm text-slate-400">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:outline-none"
            >
              <option value="">All categories</option>
              {categories.map((cat) => (
                <option value={cat} key={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-slate-400">Sort by Price</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:outline-none"
            >
              <option value="desc">High to Low</option>
              <option value="asc">Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product List */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">All products</h2>
            <p className="mt-2 text-slate-400">
              {adminProducts.length} products found
            </p>
          </div>
        </div>

        {adminProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-stone-50 p-8 text-center">
            <p className="text-slate-400">No products found</p>
            <p className="mt-2 text-sm text-slate-500">
              Click "Add new product" to create your first product
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {adminProducts.map((product) => (
              <div
                key={product._id}
                className="rounded-2xl border border-slate-200 bg-stone-50 p-4 transition hover:border-indigo-500/50 hover:bg-white hover:shadow-lg hover:shadow-slate-200"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                          {product.title}
                        </h3>
                        <p className="mt-1 text-slate-400 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      )}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-600">
                      <span className="rounded-full bg-white border border-slate-200 px-3 py-1 shadow-sm">
                        📦 {product.category || "Uncategorized"}
                      </span>
                      <span className="rounded-full bg-white border border-slate-200 px-3 py-1 shadow-sm">
                        💵 ${product.price}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 ${
                          product.stock > 0
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 md:flex-col">
                    <button
                      type="button"
                      onClick={() => handleEdit(product)}
                      className="flex-1 rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(product._id)}
                      className="flex-1 rounded-2xl bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal for Add/Edit Product */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingId ? "Edit product" : "Create new product"}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              placeholder="Product title"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
              placeholder="Product description"
              rows="4"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Price
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Stock
              </label>
              <input
                name="stock"
                type="number"
                value={form.stock}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Category
              </label>
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none"
                placeholder="e.g., Electronics"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">
                Product image
              </label>
              <input
                name="image"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-stone-50 px-4 py-3 text-slate-900 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-400">❌ {error}</p>}

          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">
            <button
              type="submit"
              disabled={actionLoading}
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              {actionLoading
                ? "Saving..."
                : editingId
                  ? "Update product"
                  : "Create product"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
