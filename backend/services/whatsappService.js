const twilio = require("twilio");

// Initialize Twilio client function
function initializeTwilioClient() {
  console.log("🔧 Initializing Twilio client...");
  console.log(
    "📞 Account SID:",
    process.env.TWILIO_ACCOUNT_SID ? "Present" : "Missing"
  );
  console.log(
    "🔑 Auth Token:",
    process.env.TWILIO_AUTH_TOKEN ? "Present" : "Missing"
  );

  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      console.log("✅ Twilio client initialized successfully");
      return client;
    } catch (error) {
      console.log("⚠️ Error initializing Twilio client:", error.message);
      return null;
    }
  } else {
    console.log("⚠️ Twilio credentials not configured, using mock mode");
    return null;
  }
}

// WhatsApp service for salary notifications
class WhatsAppService {
  constructor() {
    // Use Twilio sandbox number for testing
    this.fromNumber = "whatsapp:+14155238886"; // Twilio WhatsApp sandbox
  }

  // Send salary notification to employee
  async sendSalaryNotification(employeeData, salaryData) {
    try {
      const phoneNumber = this.formatPhoneNumber(employeeData.phone_number);

      if (!phoneNumber) {
        console.log("❌ Invalid phone number for WhatsApp notification");
        return { success: false, error: "Invalid phone number" };
      }

      const message = this.createSalaryMessage(employeeData, salaryData);

      console.log("📱 Sending WhatsApp notification to:", phoneNumber);
      console.log("📝 Message:", message);

      // Initialize Twilio client
      const client = initializeTwilioClient();

      // Check if Twilio is configured
      if (!client) {
        console.log(
          "⚠️ Twilio not configured, simulating WhatsApp notification"
        );
        console.log(
          "📱 Mock WhatsApp notification would be sent to:",
          phoneNumber
        );
        console.log("📝 Mock message content:", message);
        return {
          success: true,
          messageId: "mock-message-id-" + Date.now(),
          mock: true,
        };
      }

      const result = await client.messages.create({
        body: message,
        from: this.fromNumber,
        to: `whatsapp:${phoneNumber}`,
      });

      console.log("✅ WhatsApp notification sent successfully:", result.sid);
      return { success: true, messageId: result.sid };
    } catch (error) {
      console.error("❌ Error sending WhatsApp notification:", error);
      return { success: false, error: error.message };
    }
  }

  // Format phone number for WhatsApp
  formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return null;

    // Remove spaces and special characters
    let cleaned = phoneNumber.replace(/\s+/g, "").replace(/[^\d+]/g, "");

    // Handle Pakistani numbers
    if (cleaned.startsWith("+92")) {
      return cleaned;
    } else if (cleaned.startsWith("0")) {
      return "+92" + cleaned.substring(1);
    } else if (cleaned.startsWith("92")) {
      return "+" + cleaned;
    } else if (cleaned.length === 11 && cleaned.startsWith("3")) {
      return "+92" + cleaned;
    }

    return null;
  }

  // Create salary notification message
  createSalaryMessage(employeeData, salaryData) {
    const paymentDate = new Date(salaryData.payment_date).toLocaleDateString(
      "en-PK"
    );
    const netSalary = parseFloat(salaryData.net_salary).toLocaleString("en-PK");

    // Get school contact from environment or use default
    const schoolContact = process.env.SCHOOL_WHATSAPP_NUMBER || "+923349393936";
    const schoolName = process.env.SCHOOL_NAME || "The Educator School";

    return `🏫 *${schoolName} - Salary Notification*

Dear *${employeeData.employee_name}*,

Your salary for *${this.getMonthName(salaryData.month)} ${
      salaryData.year
    }* has been processed successfully.

📋 *Salary Details:*
• Basic Salary: ₨${parseFloat(salaryData.basic_salary).toLocaleString("en-PK")}
• Allowances: ₨${parseFloat(salaryData.allowances || 0).toLocaleString("en-PK")}
• Deductions: ₨${parseFloat(salaryData.deductions || 0).toLocaleString("en-PK")}
• *Net Salary: ₨${netSalary}*

📅 Payment Date: ${paymentDate}
🏦 Payment Method: ${salaryData.payment_method}

💰 *Total Amount Credited: ₨${netSalary}*

Thank you for your dedication and hard work!

Best regards,
${schoolName} Administration
📞 Contact: ${schoolContact}`;
  }

  // Get month name from number
  getMonthName(monthNumber) {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[monthNumber - 1] || "Unknown";
  }

  // Send test message
  async sendTestMessage(phoneNumber) {
    try {
      const formattedNumber = this.formatPhoneNumber(phoneNumber);

      if (!formattedNumber) {
        return { success: false, error: "Invalid phone number" };
      }

      const testMessage = `🏫 *The Educator School - Test Message*

This is a test message from The Educator School salary management system.

If you receive this message, WhatsApp integration is working correctly!

Best regards,
School Administration`;

      console.log("🧪 Testing WhatsApp notification to:", formattedNumber);
      console.log("📝 Test message content:", testMessage);

      // Initialize Twilio client
      const client = initializeTwilioClient();

      // Check if Twilio is configured
      if (!client) {
        console.log("⚠️ Twilio not configured, simulating test message");
        console.log("📱 Mock test message would be sent to:", formattedNumber);
        return {
          success: true,
          messageId: "mock-test-message-id-" + Date.now(),
          mock: true,
        };
      }

      const result = await client.messages.create({
        body: testMessage,
        from: this.fromNumber,
        to: `whatsapp:${formattedNumber}`,
      });

      console.log("✅ Test message sent successfully:", result.sid);
      return { success: true, messageId: result.sid };
    } catch (error) {
      console.error("❌ Error sending test message:", error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new WhatsAppService();
