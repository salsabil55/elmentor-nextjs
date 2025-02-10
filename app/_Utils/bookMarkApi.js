import axiosClient from "./axiosClient"; // Adjust the path as necessary

const addToBook = (payload) => axiosClient.post("/bookmarks", payload);
const getUserBookItems = (email) =>
  axiosClient.get(
    `bookmarks?populate[services][populate]=image&filters[email][$eq]=${email}`
  );

const deleteBookItem = (id) => axiosClient.delete(`/bookmarks/${id}`);

export default { addToBook, getUserBookItems, deleteBookItem };
