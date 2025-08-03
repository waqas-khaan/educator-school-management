// School Configuration for WhatsApp Integration
module.exports = {
  // School Information
  schoolName: process.env.SCHOOL_NAME || "The Educator School",
  schoolContact: process.env.SCHOOL_WHATSAPP_NUMBER || "+92 300 1234567",
  schoolAddress: process.env.SCHOOL_ADDRESS || "School Address",
  
  // WhatsApp Configuration
  whatsappEnabled: process.env.WHATSAPP_ENABLED === 'true',
  whatsappProvider: process.env.WHATSAPP_PROVIDER || 'twilio', // 'twilio' or 'direct'
  
  // Twilio Configuration
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioWhatsAppNumber: process.env.TWILIO_WHATSAPP_NUMBER,
  
  // Direct WhatsApp API Configuration
  whatsappAccessToken: process.env.WHATSAPP_ACCESS_TOKEN,
  whatsappPhoneNumberId: process.env.WHATSAPP_PHONE_NUMBER_ID,
  whatsappBusinessAccountId: process.env.WHATSAPP_BUSINESS_ACCOUNT_ID,
  
  // Message Templates
  salaryNotificationTemplate: {
    title: "Salary Notification",
    greeting: "Dear",
    footer: "Thank you for your dedication and hard work!",
    signature: "School Administration"
  },
  
  // Phone Number Validation
  phoneValidation: {
    countryCode: "+92",
    minLength: 10,
    maxLength: 13,
    patterns: [
      /^\+92[0-9]{10}$/,  // +92XXXXXXXXXX
      /^0[0-9]{10}$/,     // 0XXXXXXXXXX
      /^92[0-9]{10}$/,    // 92XXXXXXXXXX
      /^[0-9]{11}$/       // XXXXXXXXXXX (starts with 3)
    ]
  }
}; 