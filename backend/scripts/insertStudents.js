const mysql = require("mysql2");

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "rootuser",
  database: process.env.DB_NAME || "TheEducatorSchool",
};

const connection = mysql.createConnection(dbConfig);

// Sample data for students
const firstNames = [
  "Ahmad",
  "Fatima",
  "Ali",
  "Aisha",
  "Muhammad",
  "Zara",
  "Hassan",
  "Sara",
  "Omar",
  "Layla",
  "Yusuf",
  "Noor",
  "Khalid",
  "Amina",
  "Ibrahim",
  "Mariam",
  "Zain",
  "Hana",
  "Ahmed",
  "Yasmin",
  "Hamza",
  "Ayesha",
  "Bilal",
  "Khadija",
  "Usman",
  "Rania",
  "Tariq",
  "Nadia",
  "Jawad",
  "Samira",
  "Rashid",
  "Farah",
  "Kamal",
  "Dina",
  "Nabil",
  "Lina",
  "Waleed",
  "Rima",
  "Karim",
  "Sana",
  "Faisal",
  "Maya",
  "Adil",
  "Nour",
  "Zaid",
  "Hiba",
  "Rayan",
  "Dalia",
  "Tamer",
  "Lara",
  "Malik",
  "Yara",
  "Nasser",
  "Rana",
  "Zaki",
  "Nada",
  "Tarek",
  "Leila",
  "Samir",
  "Mona",
  "Hakim",
  "Rita",
  "Nader",
  "Sally",
  "Wael",
  "Nina",
  "Karim",
  "Dina",
  "Rami",
  "Laila",
  "Tariq",
  "Mira",
  "Bassam",
  "Rania",
  "Naji",
  "Hala",
  "Wassim",
  "Nour",
  "Tamer",
  "Maya",
  "Hani",
  "Rana",
  "Nabil",
  "Sara",
  "Khaled",
  "Lina",
  "Adel",
  "Yasmin",
  "Waleed",
  "Dalia",
  "Karim",
  "Hana",
  "Samir",
  "Amina",
  "Nader",
  "Zara",
];

const lastNames = [
  "Khan",
  "Ali",
  "Hassan",
  "Ahmed",
  "Rahman",
  "Malik",
  "Saleem",
  "Iqbal",
  "Zafar",
  "Rizvi",
  "Hussain",
  "Mahmood",
  "Akhtar",
  "Siddiqui",
  "Qureshi",
  "Butt",
  "Sheikh",
  "Mirza",
  "Chaudhry",
  "Hashmi",
  "Rashid",
  "Khalid",
  "Farooq",
  "Nadeem",
  "Saeed",
  "Tariq",
  "Waqar",
  "Imran",
  "Javed",
  "Aslam",
  "Rauf",
  "Shahid",
  "Mansoor",
  "Fazal",
  "Rashid",
  "Khalil",
  "Sadiq",
  "Nawaz",
  "Shah",
  "Khan",
  "Ali",
  "Hassan",
  "Ahmed",
  "Rahman",
  "Malik",
  "Saleem",
  "Iqbal",
  "Zafar",
  "Rizvi",
  "Hussain",
  "Mahmood",
  "Akhtar",
];

const fatherNames = [
  "Abdul Rahman",
  "Muhammad Ali",
  "Ahmed Hassan",
  "Khalid Mahmood",
  "Ibrahim Khan",
  "Omar Farooq",
  "Yusuf Saleem",
  "Bilal Rizvi",
  "Hamza Malik",
  "Zain Iqbal",
  "Tariq Hussain",
  "Usman Akhtar",
  "Karim Sadiq",
  "Nabil Rashid",
  "Adil Khalil",
  "Waleed Nawaz",
  "Samir Shah",
  "Rayan Khan",
  "Malik Ali",
  "Faisal Hassan",
  "Kamal Ahmed",
  "Nasser Rahman",
  "Tamer Malik",
  "Hani Saleem",
  "Wael Iqbal",
  "Karim Rizvi",
  "Nader Hussain",
  "Samir Akhtar",
  "Tarek Sadiq",
  "Bassam Rashid",
  "Hakim Khalil",
  "Naji Nawaz",
  "Adel Shah",
  "Khaled Khan",
  "Wassim Ali",
  "Hani Hassan",
  "Nabil Ahmed",
  "Tariq Rahman",
  "Usman Malik",
  "Bilal Saleem",
  "Hamza Iqbal",
  "Zain Rizvi",
  "Tamer Hussain",
  "Karim Akhtar",
  "Nader Sadiq",
  "Samir Rashid",
  "Tarek Khalil",
  "Bassam Nawaz",
  "Hakim Shah",
  "Naji Khan",
  "Adel Ali",
  "Khaled Hassan",
  "Wassim Ahmed",
  "Hani Rahman",
  "Nabil Malik",
];

const addresses = [
  "House 123, Street 5, Gulberg III, Lahore",
  "Apartment 45, Block A, DHA Phase 6, Karachi",
  "House 78, Street 12, F-8/1, Islamabad",
  "Villa 23, Street 3, Bahria Town, Rawalpindi",
  "House 156, Street 8, Gulshan-e-Iqbal, Karachi",
  "Apartment 89, Block C, DHA Phase 5, Lahore",
  "House 234, Street 15, F-10/2, Islamabad",
  "Villa 67, Street 7, Bahria Town Phase 8, Rawalpindi",
  "House 345, Street 20, Gulberg II, Lahore",
  "Apartment 12, Block D, DHA Phase 4, Karachi",
  "House 456, Street 25, F-7/3, Islamabad",
  "Villa 89, Street 10, Bahria Town Phase 7, Rawalpindi",
  "House 567, Street 30, Gulberg I, Lahore",
  "Apartment 34, Block E, DHA Phase 3, Karachi",
  "House 678, Street 35, F-6/4, Islamabad",
  "Villa 45, Street 13, Bahria Town Phase 6, Rawalpindi",
  "House 789, Street 40, Gulberg IV, Lahore",
  "Apartment 56, Block F, DHA Phase 2, Karachi",
  "House 890, Street 45, F-5/5, Islamabad",
  "Villa 67, Street 16, Bahria Town Phase 5, Rawalpindi",
];

const phoneNumbers = [
  "03001234567",
  "03009876543",
  "03005556677",
  "03004443322",
  "03003332211",
  "03002221100",
  "03001110099",
  "03009998877",
  "03008887766",
  "03007776655",
  "03006665544",
  "03005554433",
  "03004443322",
  "03003332211",
  "03002221100",
  "03001110099",
  "03009998877",
  "03008887766",
  "03007776655",
  "03006665544",
  "03005554433",
  "03004443322",
  "03003332211",
  "03002221100",
  "03001110099",
  "03009998877",
  "03008887766",
  "03007776655",
  "03006665544",
  "03005554433",
  "03004443322",
  "03003332211",
  "03002221100",
  "03001110099",
  "03009998877",
  "03008887766",
  "03007776655",
  "03006665544",
  "03005554433",
  "03004443322",
  "03003332211",
  "03002221100",
  "03001110099",
  "03009998877",
  "03008887766",
  "03007776655",
  "03006665544",
  "03005554433",
  "03004443322",
  "03003332211",
  "03002221100",
  "03001110099",
  "03009998877",
  "03008887766",
  "03007776655",
];

const cnicNumbers = [
  "3520112345678",
  "3520198765432",
  "3520155566778",
  "3520144433221",
  "3520133322110",
  "3520122211009",
  "3520111100998",
  "3520199988776",
  "3520188877665",
  "3520177766554",
  "3520166655443",
  "3520155544332",
  "3520144433221",
  "3520133322110",
  "3520122211009",
  "3520111100998",
  "3520199988776",
  "3520188877665",
  "3520177766554",
  "3520166655443",
  "3520155544332",
  "3520144433221",
  "3520133322110",
  "3520122211009",
  "3520111100998",
  "3520199988776",
  "3520188877665",
  "3520177766554",
  "3520166655443",
  "3520155544332",
  "3520144433221",
  "3520133322110",
  "3520122211009",
  "3520111100998",
  "3520199988776",
  "3520188877665",
  "3520177766554",
  "3520166655443",
  "3520155544332",
  "3520144433221",
  "3520133322110",
  "3520122211009",
  "3520111100998",
  "3520199988776",
  "3520188877665",
  "3520177766554",
  "3520166655443",
  "3520155544332",
  "3520144433221",
  "3520133322110",
  "3520122211009",
  "3520111100998",
  "3520199988776",
  "3520188877665",
  "3520177766554",
];

// Generate random data
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function generateRandomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function generateAdmissionNumber(year, sequence) {
  return `EDU-${year}-${sequence.toString().padStart(4, "0")}`;
}

async function getExistingClasses() {
  return new Promise((resolve, reject) => {
    // Get existing classes that match the pattern "1 Blue", "1 Red", "2 Blue", "2 Red"
    connection.query(
      "SELECT id, name FROM classes WHERE name LIKE '%Blue%' OR name LIKE '%Red%' ORDER BY name",
      (err, results) => {
        if (err) {
          reject(err);
          return;
        }

        console.log("Available classes:", results);

        // Filter to get "1 Blue" and "1 Red" or "2 Blue" and "2 Red"
        const targetClasses = results.filter(
          (cls) =>
            cls.name === "1 Blue" ||
            cls.name === "1 Red" ||
            cls.name === "2 Blue" ||
            cls.name === "2 Red"
        );

        if (targetClasses.length < 2) {
          reject(
            new Error(
              `Not enough target classes found. Found: ${targetClasses.length}. Need at least 2 classes.`
            )
          );
          return;
        }

        // Use the first two classes found (preferably "1 Blue" and "1 Red")
        const selectedClasses = targetClasses.slice(0, 2);
        console.log("Selected classes for student insertion:", selectedClasses);
        resolve(selectedClasses);
      }
    );
  });
}

async function insertStudents(classes) {
  const currentYear = new Date().getFullYear();
  let admissionCounter = 1;

  return new Promise((resolve, reject) => {
    let insertedCount = 0;
    const totalStudents = 100;

    for (let i = 0; i < totalStudents; i++) {
      const firstName = getRandomElement(firstNames);
      const lastName = getRandomElement(lastNames);
      const fullName = `${firstName} ${lastName}`;
      const fatherName = getRandomElement(fatherNames);
      const address = getRandomElement(addresses);
      const phone = getRandomElement(phoneNumbers);
      const cnic = getRandomElement(cnicNumbers);
      const gender = Math.random() > 0.5 ? "male" : "female";

      // Random date of birth between 2010 and 2018
      const dob = generateRandomDate(
        new Date(2010, 0, 1),
        new Date(2018, 11, 31)
      );
      const admissionDate = generateRandomDate(
        new Date(2023, 0, 1),
        new Date(2024, 11, 31)
      );

      // Alternate between the two selected classes
      const classId = classes[i % 2].id;
      const admissionNumber = generateAdmissionNumber(
        currentYear,
        admissionCounter++
      );

      const studentData = [
        admissionNumber,
        fullName,
        fatherName,
        cnic,
        phone,
        gender,
        dob.toISOString().split("T")[0],
        admissionDate.toISOString().split("T")[0],
        classId,
        5000.0, // admission_fee_amount
        3000.0, // monthly_fee
        1000.0, // transport_fee
        address,
      ];

      connection.query(
        `INSERT INTO students (
          admission_number, name, father_name, cnic, phone, gender, 
          date_of_birth, admission_date, class_id, admission_fee_amount, 
          monthly_fee, transport_fee, address
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        studentData,
        (err, result) => {
          if (err) {
            console.error(`Error inserting student ${fullName}:`, err);
          } else {
            insertedCount++;
            console.log(
              `✅ Inserted student ${insertedCount}/${totalStudents}: ${fullName} (${admissionNumber}) - Class: ${
                classes[i % 2].name
              }`
            );
          }

          if (insertedCount === totalStudents) {
            resolve(insertedCount);
          }
        }
      );
    }
  });
}

async function main() {
  try {
    console.log("🚀 Starting student insertion script...");

    // Get existing classes
    console.log("📚 Getting existing classes...");
    const classes = await getExistingClasses();
    console.log("Classes to use:", classes);

    // Insert students
    console.log("👥 Inserting 100 students...");
    const insertedCount = await insertStudents(classes);

    console.log(`✅ Successfully inserted ${insertedCount} students!`);
    console.log(
      `📊 Distribution: ${insertedCount / 2} students in ${classes[0].name}, ${
        insertedCount / 2
      } students in ${classes[1].name}`
    );

    connection.end();
  } catch (error) {
    console.error("❌ Error:", error);
    connection.end();
    process.exit(1);
  }
}

// Run the script
main();
