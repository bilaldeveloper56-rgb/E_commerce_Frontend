// Future-ready Cart service
// Currently mock calls since API is not implemented on backend, ready to switch when APIs are ready.

export const getCartApi = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  const localCart = localStorage.getItem("cart");
  return {
    success: true,
    data: localCart ? JSON.parse(localCart) : [],
  };
};

export const syncCartApi = async (cartItems) => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  localStorage.setItem("cart", JSON.stringify(cartItems));
  return {
    success: true,
    data: cartItems,
  };
};

const cartService = {
  getCart: getCartApi,
  syncCart: syncCartApi,
};

export default cartService;
