/**
 * API Service
 * Following SoC: All API calls are centralized here
 * Following Open/Closed: Easy to extend with new endpoints
 */

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "https://api.example.com";

export const authService = {
  login: async (email: string, password: string) => {
    // Your login logic here
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  logout: async () => {
    // Your logout logic here
  },
};
