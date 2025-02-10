import axiosClient from "./axiosClient"; // Adjust the path as necessary

const createOrder = (data) => axiosClient.post("/orders", data);

const getUserOrderItems = async (email) => {
  try {
    const response = await axiosClient.get(
      `orders?populate[services][populate]=image&filters[email][$eq]=${email}`
    );

    const orders = response.data?.data || [];

    if (orders.length === 0) {
      console.log("No orders found for this user.");
      return null;
    }

    // Sort orders by creation date (assumes there's a `createdAt` field)
    const sortedOrders = orders.sort(
      (a, b) =>
        new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt)
    );

    // Return the latest order
    return sortedOrders[0];
  } catch (error) {
    console.error("Error fetching user orders:", error);
    throw error;
  }
};

export default { createOrder, getUserOrderItems };
