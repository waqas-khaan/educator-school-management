// Cookie utility functions for authentication

// Set a cookie with expiration
export function setCookie(name, value, days = 7) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  // For LAN IP, don't set domain to avoid issues
  const isLAN = window.location.hostname === "localhost";
  const cookieString = isLAN
    ? `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=None;Secure`
    : `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;

  document.cookie = cookieString;
}

// Get a cookie value
export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Delete a cookie
export function deleteCookie(name) {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Set authentication data (hybrid: cookies + localStorage)
export function setAuthCookies(token, userData) {
  // Set cookies
  setCookie("auth_token", token, 7);
  setCookie("user_data", JSON.stringify(userData), 7);

  // Also set localStorage as fallback
  localStorage.setItem("auth_token", token);
  localStorage.setItem("user_data", JSON.stringify(userData));
  localStorage.setItem("user", JSON.stringify({ token, ...userData }));
}

// Get authentication data from cookies or localStorage
export function getAuthData() {
  // Try cookies first
  const cookieToken = getCookie("auth_token");
  const cookieUserData = getCookie("user_data");

  if (cookieToken && cookieUserData) {
    try {
      return {
        token: cookieToken,
        user: JSON.parse(cookieUserData),
      };
    } catch (error) {
      console.error("Error parsing user data from cookie:", error);
    }
  }

  // Fallback to localStorage
  const localToken = localStorage.getItem("auth_token");
  const localUserData = localStorage.getItem("user_data");

  if (localToken && localUserData) {
    try {
      return {
        token: localToken,
        user: JSON.parse(localUserData),
      };
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
    }
  }

  // Final fallback to old localStorage format
  const oldUser = localStorage.getItem("user");
  if (oldUser) {
    try {
      const userData = JSON.parse(oldUser);
      return {
        token: userData.token,
        user: {
          role: userData.role,
          name: userData.name,
          email: userData.email,
        },
      };
    } catch (error) {
      console.error("Error parsing old user data:", error);
    }
  }

  // TEMPORARY: Check for temporary auth
  const tempAuth = localStorage.getItem("temp_auth");
  if (tempAuth) {
    try {
      return JSON.parse(tempAuth);
    } catch (error) {
      console.error("Error parsing temp auth data:", error);
    }
  }

  return null;
}

// Clear authentication data
export function clearAuthCookies() {
  // Clear cookies
  deleteCookie("auth_token");
  deleteCookie("user_data");

  // Clear localStorage
  localStorage.removeItem("auth_token");
  localStorage.removeItem("user_data");
  localStorage.removeItem("user");
}

// Check if user is authenticated
export function isAuthenticated() {
  return getAuthData() !== null;
}
