const axios = require("axios");

// Test the comprehensive auto fee slip update system
async function testComprehensiveArrearsSystem() {
  try {
    console.log("🧪 Testing comprehensive arrears accumulation system...");

    // Trigger auto update manually
    const response = await axios.post(
      "http://localhost:8081/api/fee-slips/trigger-auto-update"
    );

    console.log("✅ Auto update triggered successfully");
    console.log("📊 Response:", response.data);

    // Check the updated fee slips
    const feeSlipsResponse = await axios.get(
      "http://localhost:8081/api/fee-slips"
    );
    console.log("📋 Current fee slips:", feeSlipsResponse.data.length);

    // Show some examples with comprehensive arrears
    const recentSlips = feeSlipsResponse.data.slice(0, 3);
    console.log("\n📄 Updated Fee Slips with Comprehensive Arrears:");
    recentSlips.forEach((slip) => {
      console.log(
        `   ${slip.student_name} (${slip.month}/${slip.year}): Monthly=${slip.monthly_fee} + Transport=${slip.transport_fee} + Arrears=${slip.arrears_amount} = Total Rs${slip.total_amount}`
      );
    });

    // Test arrears report for a specific student
    if (recentSlips.length > 0) {
      const studentId = recentSlips[0].student_id;
      const arrearsReport = await axios.get(
        `http://localhost:8081/api/fee-slips/arrears-report/${studentId}`
      );

      console.log("\n📊 Comprehensive Arrears Report:");
      console.log(`Student: ${arrearsReport.data.summary.student_name}`);
      console.log(
        `Total Arrears: Rs ${arrearsReport.data.summary.total_arrears}`
      );
      console.log(
        `Total Fee Slips: ${arrearsReport.data.summary.total_fee_slips}`
      );

      console.log("\n📋 Fee History:");
      arrearsReport.data.report.fee_slips.slice(0, 5).forEach((slip) => {
        console.log(
          `   ${slip.month}/${slip.year}: Total=Rs${slip.total_amount}, Paid=Rs${slip.total_paid}, Unpaid=Rs${slip.unpaid_amount}`
        );
      });
    }
  } catch (error) {
    console.error(
      "❌ Error testing comprehensive arrears system:",
      error.response?.data || error.message
    );
  }
}

// Run the comprehensive test
testComprehensiveArrearsSystem();
