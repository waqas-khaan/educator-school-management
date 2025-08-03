// Cookie utility functions for authentication

// Set a cookie with expiration
export function setCookie(name, value, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
}

// Get a cookie value
export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Delete a cookie
export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Set authentication cookies
export function setAuthCookies(token, userData) {
  setCookie('auth_token', token, 7); // 7 days
  setCookie('user_data', JSON.stringify(userData), 7);
}

// Get authentication data from cookies
export function getAuthData() {
  const token = getCookie('auth_token');
  const userData = getCookie('user_data');
  
  if (token && userData) {
    try {
      return {
        token,
        user: JSON.parse(userData)
      };
    } catch (error) {
      console.error('Error parsing user data from cookie:', error);
      return null;
    }
  }
  return null;
}

// Clear authentication cookies
export function clearAuthCookies() {
  deleteCookie('auth_token');
  deleteCookie('user_data');
}

// Check if user is authenticated
export function isAuthenticated() {
  return getCookie('auth_token') !== null;
} 