import { useState } from 'react';
import { X, User, Phone, MapPin, Navigation, Package, Check, MessageCircle, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, restaurantConfig } from '@/data/menu';
import {
  buildOrderMessage,
  sendWhatsAppOrder,
  validateMobile,
  validatePincode,
  type CustomerInfo,
} from '@/utils/whatsapp';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  address?: string;
  area?: string;
  pincode?: string;
}

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const [form, setForm] = useState<CustomerInfo>({
    name: '',
    mobile: '',
    address: '',
    area: '',
    pincode: '',
    instructions: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderSent, setOrderSent] = useState(false);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Please enter your full name';
    if (!form.mobile.trim()) {
      newErrors.mobile = 'Please enter your mobile number';
    } else if (!validateMobile(form.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    }
    if (!form.address.trim()) newErrors.address = 'Please enter your delivery address';
    if (!form.area.trim()) newErrors.area = 'Please enter your area / locality';
    if (!form.pincode.trim()) {
      newErrors.pincode = 'Please enter your pincode';
    } else if (!validatePincode(form.pincode)) {
      newErrors.pincode = 'Enter a valid 6-digit pincode';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    const message = buildOrderMessage(items, totalPrice, form);
    sendWhatsAppOrder(message);
    setOrderSent(true);
  };

  const handleClose = () => {
    if (orderSent) {
      clearCart();
      setOrderSent(false);
      setForm({ name: '', mobile: '', address: '', area: '', pincode: '', instructions: '' });
    }
    onClose();
  };

  const grandTotal = totalPrice + restaurantConfig.deliveryCharge;

  const inputClass = (field: keyof FormErrors) =>
    `w-full pl-11 pr-4 py-3 rounded-xl border text-sm text-[#252525] bg-[#FFF8F0] transition-all focus:outline-none ${
      errors[field]
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200'
        : 'border-[#800020]/15 focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/30'
    }`;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-[#FFF8F0] rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
          {orderSent ? (
            /* Order sent confirmation */
            <div className="p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-[#800020] mb-3">Order Sent!</h2>
              <p className="text-[#252525]/70 text-sm leading-relaxed mb-6">
                Your order has been opened in WhatsApp. Please press send to deliver it to
                Hotel Ram. Your order will be confirmed by Hotel Ram after we receive your
                WhatsApp message.
              </p>
              <button
                onClick={handleClose}
                className="bg-[#800020] hover:bg-[#6b0019] text-white px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="sticky top-0 bg-[#800020] text-white p-4 flex items-center justify-between rounded-t-2xl z-10">
                <h2 className="font-bold text-lg">Checkout</h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close checkout"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-5">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-[#252525]/60">
                      Your cart is empty. Add items before checking out.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-4 bg-[#800020] hover:bg-[#6b0019] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
                    >
                      Browse Menu
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Customer details */}
                    <div>
                      <h3 className="font-bold text-[#800020] text-sm uppercase tracking-wider mb-3">
                        Customer Details
                      </h3>
                      <div className="space-y-3">
                        {/* Name */}
                        <div>
                          <div className="relative">
                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#252525]/40" />
                            <input
                              type="text"
                              placeholder="Full Name *"
                              value={form.name}
                              onChange={(e) => setForm({ ...form, name: e.target.value })}
                              className={inputClass('name')}
                              aria-label="Full name"
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.name}
                            </p>
                          )}
                        </div>

                        {/* Mobile */}
                        <div>
                          <div className="relative">
                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#252525]/40" />
                            <input
                              type="tel"
                              placeholder="Mobile Number * (e.g. 9876543210)"
                              value={form.mobile}
                              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                              className={inputClass('mobile')}
                              aria-label="Mobile number"
                              maxLength={13}
                            />
                          </div>
                          {errors.mobile && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.mobile}
                            </p>
                          )}
                        </div>

                        {/* Address */}
                        <div>
                          <div className="relative">
                            <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-[#252525]/40" />
                            <textarea
                              placeholder="Complete Delivery Address *"
                              value={form.address}
                              onChange={(e) => setForm({ ...form, address: e.target.value })}
                              className={inputClass('address').replace('py-3', 'py-3') + ' resize-none'}
                              rows={2}
                              aria-label="Delivery address"
                            />
                          </div>
                          {errors.address && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {errors.address}
                            </p>
                          )}
                        </div>

                        {/* Area + Pincode */}
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <div className="relative">
                              <Navigation className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#252525]/40" />
                              <input
                                type="text"
                                placeholder="Area / Locality *"
                                value={form.area}
                                onChange={(e) => setForm({ ...form, area: e.target.value })}
                                className={inputClass('area')}
                                aria-label="Area or locality"
                              />
                            </div>
                            {errors.area && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.area}
                              </p>
                            )}
                          </div>
                          <div>
                            <div className="relative">
                              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#252525]/40" />
                              <input
                                type="text"
                                placeholder="Pincode *"
                                value={form.pincode}
                                onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                                className={inputClass('pincode')}
                                aria-label="Pincode"
                                maxLength={6}
                              />
                            </div>
                            {errors.pincode && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" /> {errors.pincode}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Instructions */}
                        <div>
                          <textarea
                            placeholder="Special Instructions (optional)"
                            value={form.instructions}
                            onChange={(e) => setForm({ ...form, instructions: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#800020]/15 text-sm text-[#252525] bg-[#FFF8F0] focus:outline-none focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/30 resize-none transition-all"
                            rows={2}
                            aria-label="Special instructions"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Payment method */}
                    <div>
                      <h3 className="font-bold text-[#800020] text-sm uppercase tracking-wider mb-3">
                        Payment Method
                      </h3>
                      <div className="bg-white rounded-xl p-4 border-2 border-[#25D366] flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                          <span className="text-lg">💵</span>
                        </div>
                        <div>
                          <p className="font-semibold text-[#252525] text-sm">
                            Cash on Delivery (COD)
                          </p>
                          <p className="text-[#252525]/50 text-xs">
                            Pay with cash when your order arrives
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div>
                      <h3 className="font-bold text-[#800020] text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Order Summary
                      </h3>
                      <div className="bg-white rounded-xl p-4 space-y-2">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-[#252525]/80 truncate pr-2">
                              {item.name} × {item.quantity}
                            </span>
                            <span className="text-[#252525] font-medium shrink-0">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                        <div className="border-t border-[#800020]/10 pt-2 mt-2 space-y-1.5">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#252525]/70">Subtotal</span>
                            <span className="text-[#252525] font-medium">
                              {formatPrice(totalPrice)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[#252525]/70">Delivery Charge</span>
                            <span className="text-[#252525]/50 text-xs">
                              {restaurantConfig.deliveryCharge > 0
                                ? formatPrice(restaurantConfig.deliveryCharge)
                                : 'To be confirmed'}
                            </span>
                          </div>
                          <div className="flex justify-between font-bold text-[#800020] pt-1">
                            <span>Total</span>
                            <span>{formatPrice(grandTotal)}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-[#252525]/50 text-xs mt-2 italic">
                        Delivery availability and any applicable charges will be confirmed by
                        Hotel Ram through WhatsApp.
                      </p>
                    </div>

                    {/* Place order button */}
                    <button
                      onClick={handlePlaceOrder}
                      className="w-full bg-[#25D366] hover:bg-[#1eb558] text-white py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Place Order via WhatsApp
                    </button>
                    <p className="text-center text-[#252525]/50 text-xs">
                      Your order will be confirmed by Hotel Ram after we receive your
                      WhatsApp message.
                    </p>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
