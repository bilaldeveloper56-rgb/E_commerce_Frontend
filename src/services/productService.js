import axiosInstance from "../utils/axiosInstance";

export const getProductsApi = async (params = {}) => {
  const response = await axiosInstance.get("/product/getproducts", { params });
  return response.data;
};

export const getProductsForAdminApi = async (params = {}) => {
  const response = await axiosInstance.get("/product/getproductsforadmin", {
    params,
  });
  return response.data;
};

export const getSingleProductApi = async (id) => {
  const response = await axiosInstance.get(`/product/getsingleproduct/${id}`);
  return response.data;
};

export const createProductApi = async (formData) => {
  const response = await axiosInstance.post("/product/addproduct", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProductApi = async (id, formData) => {
  const response = await axiosInstance.put(
    `/product/updateproduct/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
};

export const deleteProductApi = async (id) => {
  const response = await axiosInstance.delete(`/product/deleteproduct/${id}`);
  return response.data;
};

export const getCategoriesApi = async () => {
  const response = await axiosInstance.get("/product/categories");
  return response.data;
};

const productService = {
  getProducts: getProductsApi,
  getProductsForAdmin: getProductsForAdminApi,
  getSingleProduct: getSingleProductApi,
  createProduct: createProductApi,
  updateProduct: updateProductApi,
  deleteProduct: deleteProductApi,
  getCategories: getCategoriesApi,
};

export default productService;
