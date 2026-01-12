import api from "./api";

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAccount = async (userData) => {
  try {
    const response = await api.post("/create-account", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendResetEmail = async (email) => {
  try {
    const response = await api.post("send-email", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async ({ token, password }) => {
  try {
    const response = await api.patch("/reset-password", { token, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};
