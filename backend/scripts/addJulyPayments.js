const db = require("../config/db");

// Add partial payments for July fees to demonstrate arrears functionality
const addJulyPayments = async () => {
  console.log("🔧 Adding partial payments for July 2024 fees...");
  
  const payments = [
    {
      student_id: 364, // Ahmed Iqbal
      fee_type: "Monthly Fee",
      amount: 2000, // Partial payment (3000 - 2000 = 1000 remaining)
      payment_date: "2024-07-15",
      payment_method: "Cash",
      month: 7,
      year: 2024,
      remarks: "Partial monthly fee payment"
    },
    {
      student_id: 375, // Aisha Hussain
      fee_type: "Transport Fee",
      amount: 500, // Partial payment (1000 - 500 = 500 remaining)
      payment_date: "2024-07-20",
      payment_method: "Bank Transfer",
      month: 7,
      year: 2024,
      remarks: "Partial transport fee payment"
    },
    {
      student_id: 380, // Ahmed Ali
      fee_type: "Admission Fee",
      amount: 3000, // Partial payment (5000 - 3000 = 2000 remaining)
      payment_date: "2024-07-25",
      payment_method: "Cheque",
      month: 7,
      year: 2024,
      remarks: "Partial admission fee payment"
    }
  ];
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const payment of payments) {
    try {
      console.log(`📋 Processing payment for student ID ${payment.student_id}:`);
      console.log(`   - Fee Type: ${payment.fee_type}`);
      console.log(`   - Amount: Rs${payment.amount}`);
      console.log(`   - Payment Date: ${payment.payment_date}`);
      
      const insertQuery = `
        INSERT INTO fees (
          student_id, fee_type, amount, payment_date, payment_method, 
          month, year, remarks, admission_fee_paid, transport_fee_paid
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const values = [
        payment.student_id,
        payment.fee_type,
        payment.amount,
        payment.payment_date,
        payment.payment_method,
        payment.month,
        payment.year,
        payment.remarks,
        payment.fee_type === "Admission Fee" ? payment.amount : 0,
        payment.fee_type === "Transport Fee" ? payment.amount : 0
      ];
      
      db.query(insertQuery, values, (err, result) => {
        if (err) {
          console.error(`❌ Error adding payment:`, err);
          errorCount++;
        } else {
          console.log(`✅ Payment added successfully (ID: ${result.insertId})`);
          successCount++;
        }
      });
      
    } catch (error) {
      console.error(`❌ Error processing payment:`, error);
      errorCount++;
    }
  }
  
  // Wait a bit for async operations to complete
  setTimeout(() => {
    console.log("\n📊 July 2024 Payment Summary:");
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📋 Total Processed: ${payments.length}`);
    
    console.log("\n📋 Payment Details:");
    payments.forEach((payment, index) => {
      console.log(`   ${index + 1}. Student ID ${payment.student_id} - ${payment.fee_type}: Rs${payment.amount}`);
    });
    
    console.log("\n✅ July 2024 payments added successfully!");
    console.log("💡 These partial payments will create arrears when August fee slips are generated.");
    
    process.exit(0);
  }, 2000);
};

// Run the script
if (require.main === module) {
  addJulyPayments()
    .catch((error) => {
      console.error("❌ Error adding July payments:", error);
      process.exit(1);
    });
}

module.exports = { addJulyPayments }; 