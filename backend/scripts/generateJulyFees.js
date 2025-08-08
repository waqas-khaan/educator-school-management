const db = require("../config/db");
const { generateFeeSlipForStudent } = require("../services/autoFeeSlipService");

// Get actual students from database for July fee generation
const getStudentsForJuly = () => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT 
        s.id,
        s.name,
        s.admission_number,
        c.name as class_name,
        s.monthly_fee,
        s.transport_fee,
        s.admission_fee_amount,
        s.is_admission_paid,
        s.status
      FROM students s
      LEFT JOIN classes c ON s.class_id = c.id
      WHERE s.status = 'Active'
      ORDER BY s.name
      LIMIT 5
    `;
    
    db.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// July 2024 fee generation
const generateJulyFees = async () => {
  console.log("🔧 Generating July 2024 fee slips for selected students...");
  
  try {
    // Get actual students from database
    const studentsForJuly = await getStudentsForJuly();
    
    if (studentsForJuly.length === 0) {
      console.log("❌ No active students found in database");
      return;
    }
    
    console.log(`📋 Found ${studentsForJuly.length} students for July fee generation`);
    
    const julyMonth = 7;
    const julyYear = 2024;
    
    const results = [];
    let successCount = 0;
    let errorCount = 0;
    
    for (const student of studentsForJuly) {
      try {
        console.log(`📋 Processing student: ${student.name} (${student.admission_number})`);
        
        const result = await generateFeeSlipForStudent(student, julyMonth, julyYear);
        results.push(result);
        successCount++;
        
        console.log(`✅ Generated July fee slip for ${student.name}:`);
        console.log(`   - Total Amount: Rs${result.totalAmount}`);
        console.log(`   - Arrears: Rs${result.arrears}`);
        console.log(`   - Slip Number: ${result.slipNumber}`);
        
      } catch (error) {
        console.error(`❌ Error generating July fee slip for ${student.name}:`, error);
        errorCount++;
      }
    }
    
    console.log("\n📊 July 2024 Fee Generation Summary:");
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📋 Total Processed: ${studentsForJuly.length}`);
    
    if (results.length > 0) {
      console.log("\n📋 Generated Fee Slips:");
      results.forEach((result, index) => {
        const student = studentsForJuly[index];
        console.log(`   ${index + 1}. ${student.name} - Rs${result.totalAmount} (Slip: ${result.slipNumber})`);
      });
    }
    
    return {
      successCount,
      errorCount,
      totalStudents: studentsForJuly.length,
      results
    };
    
  } catch (error) {
    console.error("❌ Error getting students from database:", error);
    throw error;
  }
};

// Run the script
if (require.main === module) {
  generateJulyFees()
    .then((result) => {
      console.log("\n✅ July 2024 fee generation completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("❌ Error generating July fees:", error);
      process.exit(1);
    });
}

module.exports = { generateJulyFees }; 