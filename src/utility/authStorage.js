// localStorage utility for managing auth data
// Industry standard approach for client-side SPA authentication

const AUTH_KEY = "shocanvas_auth";

export const authStorage = {
  // Save user UID to localStorage
  saveUID: (uid) => {
    try {
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({ uid, timestamp: Date.now() }),
      );
    } catch (error) {
      console.error("Error saving UID to storage:", error);
    }
  },

  // Get UID from localStorage
  getUID: () => {
    try {
      const data = localStorage.getItem(AUTH_KEY);
      return data ? JSON.parse(data).uid : null;
    } catch (error) {
      console.error("Error retrieving UID from storage:", error);
      return null;
    }
  },

  // Clear storage on logout
  clearStorage: () => {
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch (error) {
      console.error("Error clearing storage:", error);
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return authStorage.getUID() !== null;
  },
};
