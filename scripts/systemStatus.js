const axios = require("axios");

// Simple system status dashboard
async function checkSystemStatus() {
  console.log("🔍 SYSTEM STATUS DASHBOARD");
  console.log("=".repeat(50));

  const baseURL = "http://localhost:8081";
  const checks = [];

  try {
    // Check 1: Backend connectivity
    console.log("🔧 Checking backend connectivity...");
    const studentsResponse = await axios.get(`${baseURL}/api/students`);
    console.log(
      `   ✅ Backend online - ${studentsResponse.data.length} students`
    );
    checks.push("✅ Backend");

    // Check 2: Fee slips
    console.log("🔧 Checking fee slips...");
    const slipsResponse = await axios.get(`${baseURL}/api/fee-slips`);
    console.log(
      `   ✅ Fee slips accessible - ${slipsResponse.data.length} records`
    );
    checks.push("✅ Fee Slips");

    // Check 3: Recent fee slip validation
    if (slipsResponse.data.length > 0) {
      const recentSlip = slipsResponse.data[0];
      const calculatedTotal =
        parseFloat(recentSlip.monthly_fee) +
        parseFloat(recentSlip.transport_fee) +
        parseFloat(recentSlip.arrears_amount);
      const actualTotal = parseFloat(recentSlip.total_amount);

      if (Math.abs(calculatedTotal - actualTotal) < 0.01) {
        console.log(`   ✅ Fee calculation accurate`);
        checks.push("✅ Calculations");
      } else {
        console.log(
          `   ❌ Fee calculation error: ${calculatedTotal} ≠ ${actualTotal}`
        );
        checks.push("❌ Calculations");
      }
    }

    // Check 4: Pending fees
    console.log("🔧 Checking pending fees...");
    const pendingResponse = await axios.get(`${baseURL}/api/fees/pending`);
    const totalPending = pendingResponse.data.reduce(
      (sum, student) => sum + parseFloat(student.arrears_amount),
      0
    );
    console.log(
      `   ✅ Pending fees calculated - Rs ${totalPending.toFixed(2)} total`
    );
    checks.push("✅ Pending Fees");

    // Check 5: Auto update system
    console.log("🔧 Testing auto update system...");
    const updateResponse = await axios.post(
      `${baseURL}/api/fee-slips/trigger-auto-update`
    );
    console.log(`   ✅ Auto update system functional`);
    checks.push("✅ Auto Update");

    // Summary
    console.log("\n📊 SYSTEM HEALTH SUMMARY");
    console.log("=".repeat(50));
    checks.forEach((check) => console.log(check));

    const healthyChecks = checks.filter((c) => c.includes("✅")).length;
    const totalChecks = checks.length;
    const healthPercentage = ((healthyChecks / totalChecks) * 100).toFixed(1);

    console.log(
      `\n🎯 Overall Health: ${healthPercentage}% (${healthyChecks}/${totalChecks})`
    );

    if (healthyChecks === totalChecks) {
      console.log("🟢 ALL SYSTEMS OPERATIONAL");
    } else if (healthyChecks >= totalChecks * 0.8) {
      console.log("🟡 MINOR ISSUES DETECTED");
    } else {
      console.log("🔴 CRITICAL ISSUES - REQUIRES ATTENTION");
    }

    console.log("=".repeat(50));
  } catch (error) {
    console.log(`❌ System check failed: ${error.message}`);
    console.log("🔴 SYSTEM OFFLINE OR MISCONFIGURED");

    // Troubleshooting hints
    console.log("\n🔧 Troubleshooting:");
    console.log("1. Check if backend server is running on port 8081");
    console.log("2. Verify database connection");
    console.log("3. Check server logs for errors");
    console.log("4. Restart backend: cd backend && npm run dev");
  }
}

// Run status check
checkSystemStatus();
