import axiosClient from "./axiosClient"; // Adjust the path as necessary

// Example using Axios
const getLatestServices = () => {
  return axiosClient
    .get(`services?populate=*`)
    .then((response) => response.data) // Return the data from the response
    .catch((error) => {
      console.error("Error fetching latest services:", error);
      throw error; // Rethrow the error for handling in the calling function
    });
};
// const getLatestServicesLng = (lng) => {
//   return axiosClient
//     .get(`services?populate=*&locale=${lng}`)
//     .then((response) => response.data) // Return the data from the response
//     .catch((error) => {
//       console.error("Error fetching latest services:", error);
//       throw error; // Rethrow the error for handling in the calling function
//     });
// };
const getServicesById = (id) => {
  return axiosClient
    .get(`/services/${id}?populate=*`) // Ensure the API supports this query
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching service by ID:", error);
      throw error;
    });
};

const updateBookedService = (id, payload) => {
  return axiosClient.put(`/services/${id}`, payload);
};

export default {
  getLatestServices,
  getServicesById,
  updateBookedService,
  // getLatestServicesLng,
};
