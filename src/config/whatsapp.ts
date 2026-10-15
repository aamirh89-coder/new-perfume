/**
 * WhatsApp Business Integration Configuration
 * 
 * Update your WhatsApp business phone number here in international format.
 * (e.g., "+3333307703").
 * Spaces, parentheses, plus signs, and dashes are automatically formatted
 * into the required international digit format for WhatsApp click-to-chat.
 */
export const WHATSAPP_CONFIG = {
  // Your WhatsApp Business Phone Number (International format)
  // Can be modified here directly, or overridden via VITE_WHATSAPP_PHONE in .env
  businessPhoneNumber: (import.meta.env.VITE_WHATSAPP_PHONE as string) || '+3333307703',

  // Business Display Name
  businessName: "Maison d'Or Haute Parfumerie",

  // Service line / Concierge desk title
  conciergeTitle: "Private Atelier Concierge",

  // Default opening greeting
  greeting: "Hello, I have successfully placed an order on your website.",
};
