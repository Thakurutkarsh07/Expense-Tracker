export const saveTokenFromURL = (queryString) => {
  const params = new URLSearchParams(queryString);
  const token = params.get('token');
  if (token) {
    localStorage.setItem('token', token);
    return token;
  }
  return null;
};


// utils/auth.js
export const getToken = () => localStorage.getItem('token');

export const removeToken = () => localStorage.removeItem('token');

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload; // contains user data like email, id, etc.
  } catch {
    return null;
  }
};
