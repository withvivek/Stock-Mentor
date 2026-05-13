import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, userData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data || 
                        error.message || 
                        "Registration failed";
    console.error("Registration error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const loginUser = async (loginData) => {
  try {
    const isEmail = loginData.emailOrUsername.includes('@');
    const payload = isEmail
      ? { email: loginData.emailOrUsername, password: loginData.password }
      : { username: loginData.emailOrUsername, password: loginData.password };

    const response = await axios.post(`${API_BASE_URL}/users/login`, payload, {
      headers: { "Content-Type": "application/json" },
    });
    
    if (response.data && response.data.username) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || 
                        error.response?.data || 
                        error.message || 
                        "Login failed";
    console.error("Login error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const logoutUser = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const fetchStocks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/stocks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching stocks:", error.response?.data || error.message);
    throw error;
  }
};

export const addStock = async (stockData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/stocks`, stockData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding stock:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchCompanies = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/companies`);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchUserPortfolio = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/portfolio/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolio:", error.response?.data || error.message);
    throw error;
  }
};