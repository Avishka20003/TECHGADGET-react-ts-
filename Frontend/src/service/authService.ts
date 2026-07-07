import axios from 'axios';

const API_URL = "http://localhost:5000/api/v1/users/";

export const registerUser = async (userData: any) => {
    return await axios.post(API_URL + "register", userData);
};

export const loginUser = async (credentials: any) => {
  const response = await axios.post(API_URL + "login", credentials);
  
  if (response.data && response.data.data) {
    return response.data; 
    
  }
  throw new Error("Login failed");
};