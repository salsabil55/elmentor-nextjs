import axiosClient from "./axiosClient"; // Adjust the path as necessary

const addToCart = (payload) => axiosClient.post("/carts", payload);

const getUserCartItems = (email) =>
  axiosClient.get(
    `carts?populate[services][populate]=image&filters[email][$eq]=${email}`
  );

const deleteCartItem = (id) => axiosClient.delete(`/carts/${id}`);

export default { addToCart, getUserCartItems, deleteCartItem };
