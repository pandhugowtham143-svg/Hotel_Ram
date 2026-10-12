import { X, Plus, Minus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { formatPrice, restaurantConfig } from '@/data/menu';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-[#FFF8F0] shadow-2xl flex flex-col transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#800020] text-white">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="font-bold text-lg">
              Your Cart {totalItems > 0 && `(${totalItems})`}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 rounded-full bg-[#800020]/10 flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-[#800020]/40" />
              </div>
              <p className="text-[#252525]/60 font-medium">Your cart is empty</p>
              <p className="text-[#252525]/40 text-sm mt-1">
                Add some delicious dishes to get started!
              </p>
              <button
                onClick={closeCart}
                className="mt-4 bg-[#800020] hover:bg-[#6b0019] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 bg-white rounded-xl p-3 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-[#252525] text-sm leading-tight mb-1 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[#800020] font-bold text-sm">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity controls */}
                      <div className="flex items-center gap-2 bg-[#FFF8F0] rounded-full px-1 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-[#800020] hover:bg-[#800020] hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="font-semibold text-[#252525] text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 rounded-full bg-white shadow-sm flex items-center justify-center text-[#800020] hover:bg-[#800020] hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {/* Remove + subtotal */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#252525] font-semibold text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#800020]/10 p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[#252525]/70 text-sm">Subtotal</span>
              <span className="text-[#252525] font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[#252525]/70 text-sm">Delivery Charge</span>
              <span className="text-[#252525]/50 text-sm">
                {restaurantConfig.deliveryCharge > 0
                  ? formatPrice(restaurantConfig.deliveryCharge)
                  : 'To be confirmed'}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#800020]/10">
              <span className="font-bold text-[#800020] text-lg">Total</span>
              <span className="font-bold text-[#800020] text-lg">
                {formatPrice(totalPrice + restaurantConfig.deliveryCharge)}
              </span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-[#800020] hover:bg-[#6b0019] text-white py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-md"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
