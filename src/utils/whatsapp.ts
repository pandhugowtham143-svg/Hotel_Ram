import { restaurantConfig, formatPrice } from '@/data/menu';
import type { CartItem } from '@/types/cart';

export interface CustomerInfo {
  name: string;
  mobile: string;
  address: string;
  area: string;
  pincode: string;
  instructions?: string;
}

export function buildOrderMessage(
  items: CartItem[],
  total: number,
  customer: CustomerInfo
): string {
  const lines: string[] = [];
  lines.push('Hello Hotel Ram,');
  lines.push('');
  lines.push('I would like to place a food order.');
  lines.push('');
  lines.push(`Customer Name: ${customer.name}`);
  lines.push(`Mobile Number: ${customer.mobile}`);
  lines.push(`Delivery Address: ${customer.address}`);
  lines.push(`Area / Locality: ${customer.area}`);
  lines.push(`Pincode: ${customer.pincode}`);
  if (customer.instructions?.trim()) {
    lines.push(`Special Instructions: ${customer.instructions}`);
  }
  lines.push('');
  lines.push('Order Details:');
  lines.push('');

  items.forEach((item, idx) => {
    const itemTotal = item.price * item.quantity;
    lines.push(`${idx + 1}. ${item.name} × ${item.quantity} = ${formatPrice(itemTotal)}`);
  });

  lines.push('');
  const deliveryNote =
    restaurantConfig.deliveryCharge > 0
      ? `Delivery Charge: ${formatPrice(restaurantConfig.deliveryCharge)}`
      : 'Delivery Charge: To be confirmed';
  const grandTotal = total + restaurantConfig.deliveryCharge;
  lines.push(`Total Amount: ${formatPrice(grandTotal)}`);
  lines.push(`Payment Method: Cash on Delivery`);
  lines.push('');
  lines.push('Please confirm my order and delivery availability.');
  lines.push('');
  lines.push('Thank you!');

  return lines.join('\n');
}

export function sendWhatsAppOrder(message: string): void {
  const encoded = encodeURIComponent(message);
  window.open(`${restaurantConfig.whatsappLink}?text=${encoded}`, '_blank');
}

export function sendWhatsAppGeneral(message: string): void {
  const encoded = encodeURIComponent(message);
  window.open(`${restaurantConfig.whatsappLink}?text=${encoded}`, '_blank');
}

export function validateMobile(mobile: string): boolean {
  const cleaned = mobile.replace(/\D/g, '');
  // Indian mobile: 10 digits starting with 6-9, optional +91 prefix
  if (cleaned.length === 10 && /^[6-9]\d{9}$/.test(cleaned)) return true;
  if (cleaned.length === 12 && cleaned.startsWith('91') && /^[6-9]\d{9}$/.test(cleaned.slice(2))) return true;
  return false;
}

export function validatePincode(pincode: string): boolean {
  return /^\d{6}$/.test(pincode.trim());
}
