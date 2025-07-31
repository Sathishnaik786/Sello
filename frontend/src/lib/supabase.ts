// Frontend doesn't need direct Supabase access - all data comes through the backend API
// This file is kept for future use if needed, but currently not used

export const API_BASE_URL = 'http://192.168.1.23:5000';

// Helper function for API calls
export const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.status}`);
  }
  
  return response.json();
}; 