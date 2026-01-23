import api from "./api";

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createAccount = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendResetEmail = async (email) => {
  try {
    const response = await api.post("/auth/send-email", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async ({ token, password }) => {
  try {
    const response = await api.patch("/auth/reset-password", {
      token,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
