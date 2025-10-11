// api.js
const API_BASE_URL = import.meta.env.VITE_API_URL;

// Generic GET request
export const getRequest = async (endpoint) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    // credentials: 'include', // uncomment if backend uses cookies
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
};

// Generic POST request
export const postRequest = async (endpoint, bodyData) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // credentials: 'include', // uncomment if backend uses cookies
    body: JSON.stringify(bodyData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'API request failed');
  }
  return data;
};
