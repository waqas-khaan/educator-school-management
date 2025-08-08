const axios = require("axios");

// Comprehensive system validation tests
class SystemValidator {
  constructor() {
    this.baseURL = "http://localhost:8081";
    this.testResults = [];
  }

  // Test 1: Basic system connectivity
  async testSystemConnectivity() {
    console.log("🔧 Test 1: System Connectivity");
    try {
      const response = await axios.get(`${this.baseURL}/api/students`);
      console.log(
        `   ✅ Backend connected - Found ${response.data.length} students`
      );
      this.testResults.push({ test: "System Connectivity", status: "PASS" });
      return response.data;
    } catch (error) {
      console.log(`   ❌ Backend connection failed: ${error.message}`);
      this.testResults.push({
        test: "System Connectivity",
        status: "FAIL",
        error: error.message,
      });
      return null;
    }
  }

  // Test 2: Fee slip generation and retrieval
  async testFeeSlipRetrieval() {
    console.log("\n🔧 Test 2: Fee Slip Retrieval");
    try {
      const response = await axios.get(`${this.baseURL}/api/fee-slips`);
      console.log(
        `   ✅ Fee slips retrieved - Found ${response.data.length} fee slips`
      );
      this.testResults.push({ test: "Fee Slip Retrieval", status: "PASS" });
      return response.data;
    } catch (error) {
      console.log(`   ❌ Fee slip retrieval failed: ${error.message}`);
      this.testResults.push({
        test: "Fee Slip Retrieval",
        status: "FAIL",
        error: error.message,
      });
      return null;
    }
  }

  // Test 3: Auto update functionality
  async testAutoUpdate() {
    console.log("\n🔧 Test 3: Auto Update System");
    try {
      const response = await axios.post(
        `${this.baseURL}/api/fee-slips/trigger-auto-update`
      );
      console.log(`   ✅ Auto update triggered successfully`);
      console.log(`   📋 Response: ${response.data.message}`);
      this.testResults.push({ test: "Auto Update System", status: "PASS" });
      return true;
    } catch (error) {
      console.log(
        `   ❌ Auto update failed: ${
          error.response?.data?.error || error.message
        }`
      );
      this.testResults.push({
        test: "Auto Update System",
        status: "FAIL",
        error: error.message,
      });
      return false;
    }
  }

  // Test 4: Arrears calculation validation
  async testArrearsCalculation(studentId) {
    console.log(`\n🔧 Test 4: Arrears Calculation for Student ID ${studentId}`);
    try {
      const response = await axios.get(
        `${this.baseURL}/api/fee-slips/arrears-report/${studentId}`
      );
      const report = response.data.report;

      console.log(`   ✅ Arrears report generated for ${report.student_name}`);
      console.log(`   📊 Total arrears: Rs ${report.total_arrears}`);
      console.log(`   📋 Fee history count: ${report.fee_slips.length}`);

      // Validate calculation
      let calculatedArrears = 0;
      report.fee_slips.forEach((slip) => {
        calculatedArrears += slip.unpaid_amount;
      });

      if (Math.abs(calculatedArrears - report.total_arrears) < 0.01) {
        console.log(`   ✅ Arrears calculation is accurate`);
        this.testResults.push({ test: "Arrears Calculation", status: "PASS" });
      } else {
        console.log(
          `   ❌ Arrears calculation mismatch: Expected ${calculatedArrears}, Got ${report.total_arrears}`
        );
        this.testResults.push({ test: "Arrears Calculation", status: "FAIL" });
      }

      return report;
    } catch (error) {
      console.log(`   ❌ Arrears calculation test failed: ${error.message}`);
      this.testResults.push({
        test: "Arrears Calculation",
        status: "FAIL",
        error: error.message,
      });
      return null;
    }
  }

  // Test 5: Formula validation (Monthly + Transport + Arrears = Total)
  async testFormulaValidation() {
    console.log(
      "\n🔧 Test 5: Formula Validation (Monthly + Transport + Arrears = Total)"
    );
    try {
      const response = await axios.get(`${this.baseURL}/api/fee-slips`);
      const feeSlips = response.data.slice(0, 5); // Test first 5 slips

      let passCount = 0;
      feeSlips.forEach((slip) => {
        const calculatedTotal =
          parseFloat(slip.monthly_fee) +
          parseFloat(slip.transport_fee) +
          parseFloat(slip.arrears_amount) +
          parseFloat(slip.fine_amount || 0) -
          parseFloat(slip.discount_amount || 0);

        const actualTotal = parseFloat(slip.total_amount);

        if (Math.abs(calculatedTotal - actualTotal) < 0.01) {
          console.log(
            `   ✅ ${slip.student_name}: ${slip.monthly_fee} + ${slip.transport_fee} + ${slip.arrears_amount} = ${slip.total_amount} ✓`
          );
          passCount++;
        } else {
          console.log(
            `   ❌ ${slip.student_name}: Formula mismatch - Expected ${calculatedTotal}, Got ${actualTotal}`
          );
        }
      });

      if (passCount === feeSlips.length) {
        console.log(
          `   ✅ All ${feeSlips.length} fee slips passed formula validation`
        );
        this.testResults.push({ test: "Formula Validation", status: "PASS" });
      } else {
        console.log(
          `   ⚠️  ${passCount}/${feeSlips.length} fee slips passed formula validation`
        );
        this.testResults.push({
          test: "Formula Validation",
          status: "PARTIAL",
        });
      }
    } catch (error) {
      console.log(`   ❌ Formula validation failed: ${error.message}`);
      this.testResults.push({
        test: "Formula Validation",
        status: "FAIL",
        error: error.message,
      });
    }
  }

  // Test 6: Data consistency check
  async testDataConsistency() {
    console.log("\n🔧 Test 6: Data Consistency Check");
    try {
      const [studentsResponse, feeSlipsResponse, feesResponse] =
        await Promise.all([
          axios.get(`${this.baseURL}/api/students`),
          axios.get(`${this.baseURL}/api/fee-slips`),
          axios.get(`${this.baseURL}/api/fees`),
        ]);

      const students = studentsResponse.data;
      const feeSlips = feeSlipsResponse.data;
      const fees = feesResponse.data;

      console.log(`   📊 Data Summary:`);
      console.log(`     - Students: ${students.length}`);
      console.log(`     - Fee Slips: ${feeSlips.length}`);
      console.log(`     - Fee Payments: ${fees.length}`);

      // Check for orphaned records
      const studentIds = new Set(students.map((s) => s.id));
      const orphanedSlips = feeSlips.filter(
        (slip) => !studentIds.has(slip.student_id)
      );

      if (orphanedSlips.length === 0) {
        console.log(`   ✅ No orphaned fee slips found`);
        this.testResults.push({ test: "Data Consistency", status: "PASS" });
      } else {
        console.log(`   ⚠️  Found ${orphanedSlips.length} orphaned fee slips`);
        this.testResults.push({ test: "Data Consistency", status: "WARNING" });
      }
    } catch (error) {
      console.log(`   ❌ Data consistency check failed: ${error.message}`);
      this.testResults.push({
        test: "Data Consistency",
        status: "FAIL",
        error: error.message,
      });
    }
  }

  // Test 7: Pending fees calculation
  async testPendingFeesCalculation() {
    console.log("\n🔧 Test 7: Pending Fees Calculation");
    try {
      const response = await axios.get(`${this.baseURL}/api/fees/pending`);
      const pendingFees = response.data;

      console.log(
        `   ✅ Pending fees calculated for ${pendingFees.length} students`
      );

      // Show top 3 students with highest pending fees
      const sortedPending = pendingFees
        .sort((a, b) => b.arrears_amount - a.arrears_amount)
        .slice(0, 3);

      console.log(`   📊 Top students with pending fees:`);
      sortedPending.forEach((student) => {
        console.log(
          `     - ${student.student_name}: Rs ${student.arrears_amount}`
        );
      });

      this.testResults.push({
        test: "Pending Fees Calculation",
        status: "PASS",
      });
    } catch (error) {
      console.log(`   ❌ Pending fees calculation failed: ${error.message}`);
      this.testResults.push({
        test: "Pending Fees Calculation",
        status: "FAIL",
        error: error.message,
      });
    }
  }

  // Generate final test report
  generateTestReport() {
    console.log("\n" + "=".repeat(60));
    console.log("📋 COMPREHENSIVE SYSTEM VALIDATION REPORT");
    console.log("=".repeat(60));

    const passCount = this.testResults.filter(
      (r) => r.status === "PASS"
    ).length;
    const failCount = this.testResults.filter(
      (r) => r.status === "FAIL"
    ).length;
    const warningCount = this.testResults.filter(
      (r) => r.status === "WARNING" || r.status === "PARTIAL"
    ).length;

    this.testResults.forEach((result) => {
      const statusIcon = {
        PASS: "✅",
        FAIL: "❌",
        WARNING: "⚠️",
        PARTIAL: "⚠️",
      }[result.status];

      console.log(`${statusIcon} ${result.test}: ${result.status}`);
      if (result.error) {
        console.log(`   Error: ${result.error}`);
      }
    });

    console.log("\n📊 Summary:");
    console.log(`   ✅ Passed: ${passCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   ⚠️  Warnings: ${warningCount}`);
    console.log(`   📋 Total Tests: ${this.testResults.length}`);

    const overallStatus =
      failCount === 0 ? "SYSTEM HEALTHY" : "ISSUES DETECTED";
    console.log(`\n🎯 Overall Status: ${overallStatus}`);
    console.log("=".repeat(60));
  }

  // Run all tests
  async runAllTests() {
    console.log("🚀 Starting Comprehensive System Validation...\n");

    // Test 1: Basic connectivity
    const students = await this.testSystemConnectivity();
    if (!students) return this.generateTestReport();

    // Test 2: Fee slip retrieval
    const feeSlips = await this.testFeeSlipRetrieval();
    if (!feeSlips) return this.generateTestReport();

    // Test 3: Auto update
    await this.testAutoUpdate();

    // Test 4: Arrears calculation (use first student if available)
    if (students.length > 0) {
      await this.testArrearsCalculation(students[0].id);
    }

    // Test 5: Formula validation
    await this.testFormulaValidation();

    // Test 6: Data consistency
    await this.testDataConsistency();

    // Test 7: Pending fees
    await this.testPendingFeesCalculation();

    // Generate final report
    this.generateTestReport();
  }
}

// Run the comprehensive validation
const validator = new SystemValidator();
validator.runAllTests().catch((error) => {
  console.error("💥 Validation failed:", error.message);
});
