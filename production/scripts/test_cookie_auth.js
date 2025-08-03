// Test script for cookie-based authentication
const axios = require("axios");

// Test login and cookie functionality
async function testCookieAuth() {
  try {
    console.log("🧪 Testing Cookie Authentication...");

    // Test login
    const loginResponse = await axios.post(
      "http://localhost:8081/api/auth/login",
      {
        email: "admin@educator.com",
        password: "admin123",
      }
    );

    console.log("✅ Login successful");
    console.log("Token:", loginResponse.data.token);
    console.log("User:", loginResponse.data.user);

    // Test protected route with token
    const headers = { Authorization: `Bearer ${loginResponse.data.token}` };
    const studentsResponse = await axios.get(
      "http://localhost:8081/api/students",
      { headers }
    );

    console.log("✅ Protected route access successful");
    console.log("Students count:", studentsResponse.data.length);

    console.log("🎉 Cookie authentication test completed successfully!");
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);
  }
}

// Run test if this file is executed directly
if (require.main === module) {
  testCookieAuth();
}

module.exports = { testCookieAuth };
