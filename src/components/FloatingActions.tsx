import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Home, ShoppingBag, Menu as MenuIcon, X } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { sendWhatsAppGeneral } from '@/utils/whatsapp';

export default function FloatingActions() {
  const { totalItems, openCart } = useCart();
  const [showCall, setShowCall] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowCall(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop floating buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
        {/* Call button */}
        <a
          href={`tel:${restaurantConfig.phoneRaw}`}
          className={`hidden lg:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all hover:scale-105 ${
            showCall ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-label="Call Hotel Ram"
        >
          <Phone className="w-5 h-5" />
          <span className="text-sm font-semibold">Call Hotel Ram</span>
        </a>

        {/* WhatsApp button */}
        <button
          onClick={() =>
            sendWhatsAppGeneral(
              'Hello Hotel Ram, I would like to order food. Please share the available menu.'
            )
          }
          className="group flex items-center gap-0 bg-[#25D366] hover:bg-[#1eb558] text-white p-4 rounded-full shadow-xl transition-all hover:scale-105"
          aria-label="Order on WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-300 text-sm font-semibold whitespace-nowrap">
            <span className="pl-2">Order on WhatsApp</span>
          </span>
        </button>
      </div>

      {/* Mobile bottom navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#800020] shadow-2xl">
        <div className="flex items-center justify-around py-2">
          <button
            onClick={() => scrollTo('#home')}
            className="flex flex-col items-center gap-0.5 text-white/90 hover:text-[#FFC107] px-3 py-1.5 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] font-medium">Home</span>
          </button>
          <button
            onClick={() => scrollTo('#menu')}
            className="flex flex-col items-center gap-0.5 text-white/90 hover:text-[#FFC107] px-3 py-1.5 transition-colors"
          >
            <MenuIcon className="w-5 h-5" />
            <span className="text-[10px] font-medium">Menu</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex flex-col items-center gap-0.5 text-white/90 hover:text-[#FFC107] px-3 py-1.5 transition-colors"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Phone className="w-5 h-5" />}
            </div>
            <span className="text-[10px] font-medium">{mobileMenuOpen ? 'Close' : 'Call'}</span>
          </button>
          <button
            onClick={openCart}
            className="relative flex flex-col items-center gap-0.5 text-white/90 hover:text-[#FFC107] px-3 py-1.5 transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-1 bg-[#FFC107] text-[#800020] text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="text-[10px] font-medium">Cart</span>
          </button>
          <button
            onClick={() =>
              sendWhatsAppGeneral(
                'Hello Hotel Ram, I would like to order food. Please share the available menu.'
              )
            }
            className="flex flex-col items-center gap-0.5 text-[#25D366] px-3 py-1.5 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px] font-medium">WhatsApp</span>
          </button>
        </div>

        {/* Mobile call menu expand */}
        {mobileMenuOpen && (
          <div className="absolute bottom-full left-0 right-0 bg-[#800020] rounded-t-2xl p-4 shadow-xl animate-fade-in-up">
            <div className="flex gap-3">
              <a
                href={`tel:${restaurantConfig.phoneRaw}`}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <a
                href={restaurantConfig.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-[#FFC107] text-[#800020] py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-[#ffb300]"
              >
                Directions
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
