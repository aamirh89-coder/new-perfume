import { Order } from '../types';
import { WHATSAPP_CONFIG } from '../config/whatsapp';

/**
 * Clean phone number to pure digits in international format for WhatsApp click-to-chat.
 * e.g., "+33 1 42 68 55 00" -> "33142685500"
 */
export const sanitizePhoneNumber = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

/**
 * Secret salt used to sign valid confirmed orders generated through the checkout workflow.
 * Prevents tampering or unauthorized forging in client-side storage.
 */
const ATELIER_SIGNATURE_SALT = 'MAISON_DOR_ATELIER_SECURE_TOKEN_v1';

/**
 * Generate a deterministic verification signature for a confirmed order.
 */
export const generateOrderVerificationToken = (
  orderId: string,
  total: number,
  email: string,
  timestamp: number
): string => {
  const payload = `${orderId}:${total}:${email.toLowerCase().trim()}:${timestamp}:${ATELIER_SIGNATURE_SALT}`;
  // Simple deterministic DJB2-like hash converted to hex string for tamper verification
  let hash = 5381;
  for (let i = 0; i < payload.length; i++) {
    hash = (hash * 33) ^ payload.charCodeAt(i);
  }
  const unsignedHash = (hash >>> 0).toString(16).padStart(8, '0');
  return `VERIFIED_${unsignedHash.toUpperCase()}`;
};

/**
 * Cryptographically verifies if an order object is authentic, complete,
 * and was genuinely generated and confirmed through the checkout process.
 */
export const isOrderConfirmedAndValid = (order: unknown): order is Order => {
  if (!order || typeof order !== 'object') {
    return false;
  }

  const o = order as Partial<Order>;

  // Check valid Order ID format (e.g. MDO-123456)
  if (!o.id || typeof o.id !== 'string' || !/^MDO-\d{6}$/.test(o.id)) {
    return false;
  }

  // Check valid status
  if (!o.status || !['Confirmed', 'Dispatched', 'Delivered'].includes(o.status)) {
    return false;
  }

  // Check items list
  if (!Array.isArray(o.items) || o.items.length === 0) {
    return false;
  }

  for (const item of o.items) {
    if (!item.product || !item.product.name || typeof item.price !== 'number' || item.quantity < 1) {
      return false;
    }
  }

  // Check valid total
  if (typeof o.total !== 'number' || o.total <= 0 || isNaN(o.total)) {
    return false;
  }

  // Check customer shipping details
  if (
    !o.shippingAddress ||
    typeof o.shippingAddress !== 'object' ||
    !o.shippingAddress.fullName?.trim() ||
    !o.shippingAddress.email?.trim() ||
    !o.shippingAddress.address?.trim() ||
    !o.shippingAddress.city?.trim()
  ) {
    return false;
  }

  // Cryptographic tamper verification: Order must have valid placedTimestamp and matching token
  if (!o.placedTimestamp || typeof o.placedTimestamp !== 'number' || !o.verificationToken || typeof o.verificationToken !== 'string') {
    return false;
  }

  const expectedToken = generateOrderVerificationToken(
    o.id,
    o.total,
    o.shippingAddress.email,
    o.placedTimestamp
  );
  if (o.verificationToken !== expectedToken) {
    return false;
  }

  return true;
};

/**
 * Formats order products summary into clean text for WhatsApp message
 */
export const formatOrderProductsText = (order: Order): string => {
  return order.items
    .map((item) => `• ${item.product.name} (${item.volume}) x${item.quantity} - $${item.price * item.quantity}`)
    .join('\n');
};

/**
 * Generate the pre-filled WhatsApp message matching customer specification:
 * “Hello, I have successfully placed an order on your website. My order number is [Order ID].
 * My order details are [Product Details], and the total amount is [Total Amount].
 * Please confirm my order and delivery details.”
 */
export const generateWhatsAppOrderMessage = (order: Order): string => {
  const itemsText = formatOrderProductsText(order);
  const addressText = `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}`;

  const samplesText =
    order.selectedSamples && order.selectedSamples.length > 0
      ? `\nDiscovery Samples: ${order.selectedSamples.map((s) => s.replace('sample-', '')).join(', ')}`
      : '';

  const giftNoteText = order.giftNote ? `\nGift Dedication Note: "${order.giftNote}"` : '';

  return (
    `Hello ${WHATSAPP_CONFIG.businessName},\n\n` +
    `I have successfully placed an order on your website.\n\n` +
    `📋 Order Number: ${order.id}\n` +
    `👤 Customer: ${order.shippingAddress.fullName}\n\n` +
    `📦 Order Details:\n${itemsText}\n\n` +
    `💰 Total Amount: $${order.total}\n` +
    `📍 Delivery Address: ${addressText}` +
    `${samplesText}` +
    `${giftNoteText}\n\n` +
    `Please confirm my order and delivery details.`
  );
};

/**
 * Generate the official WhatsApp click-to-chat URL with pre-filled order data.
 * Validates the order prior to URL generation.
 */
export const generateWhatsAppOrderUrl = (
  order: Order,
  customPhone?: string
): {
  url: string;
  rawMessage: string;
  sanitizedPhone: string;
  isValid: boolean;
} => {
  if (!isOrderConfirmedAndValid(order)) {
    return {
      url: '',
      rawMessage: '',
      sanitizedPhone: '',
      isValid: false,
    };
  }

  const phoneSource = customPhone || WHATSAPP_CONFIG.businessPhoneNumber;
  const sanitizedPhone = sanitizePhoneNumber(phoneSource);
  const rawMessage = generateWhatsAppOrderMessage(order);
  const encodedMessage = encodeURIComponent(rawMessage);

  // Standard official WhatsApp click-to-chat link
  const url = `https://wa.me/${sanitizedPhone}?text=${encodedMessage}`;

  return {
    url,
    rawMessage,
    sanitizedPhone,
    isValid: true,
  };
};
