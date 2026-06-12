import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";

// Async Thunks
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params, { rejectWithValue }) => {
    try {
      const data = await productService.getProducts(params);
      return data; // returns { allproducts, numberOfProducts, success }
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch products");
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "product/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const data = await productService.getCategories();
      return data.categories; // returns array of categories
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch categories");
    }
  }
);

export const fetchAdminProducts = createAsyncThunk(
  "product/fetchAdminProducts",
  async (params, { rejectWithValue }) => {
    try {
      const data = await productService.getProductsForAdmin(params);
      return data; // returns { allproducts, numberOfProducts, success }
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch admin products");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const data = await productService.getSingleProduct(id);
      return data.product; // returns the product object
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch product details");
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/add",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await productService.createProduct(formData);
      return data.product; // returns created product
    } catch (error) {
      return rejectWithValue(error.message || "Failed to create product");
    }
  }
);

export const editProduct = createAsyncThunk(
  "product/edit",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const data = await productService.updateProduct(id, formData);
      return data.product; // returns updated product
    } catch (error) {
      return rejectWithValue(error.message || "Failed to update product");
    }
  }
);

export const removeProduct = createAsyncThunk(
  "product/remove",
  async (id, { rejectWithValue }) => {
    try {
      await productService.deleteProduct(id);
      return id; // return deleted ID to update state locally
    } catch (error) {
      return rejectWithValue(error.message || "Failed to delete product");
    }
  }
);

const initialState = {
  products: [],
  adminProducts: [],
  categories: [],
  currentProduct: null,
  totalProducts: 0,
  loading: false,
  detailLoading: false,
  actionLoading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.allproducts || [];
        state.totalProducts = action.payload.numberOfProducts || 0;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload || [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Fetch Admin Products
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.adminProducts = action.payload.allproducts || [];
        state.totalProducts = action.payload.numberOfProducts || 0;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Single Product
      .addCase(fetchProductById.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      })

      // Add Product
      .addCase(addProduct.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminProducts.unshift(action.payload);
        state.products.unshift(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Edit Product
      .addCase(editProduct.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.actionLoading = false;
        // Update admin products list
        const adminIndex = state.adminProducts.findIndex((p) => p._id === action.payload._id);
        if (adminIndex !== -1) {
          state.adminProducts[adminIndex] = action.payload;
        }
        // Update customer products list
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
        // Update current viewed product if applicable
        if (state.currentProduct && state.currentProduct._id === action.payload._id) {
          state.currentProduct = action.payload;
        }
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      // Remove Product
      .addCase(removeProduct.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.adminProducts = state.adminProducts.filter((p) => p._id !== action.payload);
        state.products = state.products.filter((p) => p._id !== action.payload);
        if (state.currentProduct && state.currentProduct._id === action.payload) {
          state.currentProduct = null;
        }
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductError, clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
