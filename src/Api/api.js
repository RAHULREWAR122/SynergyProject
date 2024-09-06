// i use here axios for requests
import axios from "axios";
// api url
const API_URL = "https://jsonplaceholder.typicode.com/users";

// fetch user data
export const fetchUsers = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    
  }
};

// create new User
export const createUser = async (userData) => {
  try {
    const response = await axios.post(API_URL, userData);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error.message);
    
  }
};

// update User using put request
export const updateUser = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error.message);
    
  }
};
// delete user using delete request
export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error.message);
    
  }
};
