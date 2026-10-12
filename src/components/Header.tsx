import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Phone, UtensilsCrossed } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { useRestaurantStatus } from '@/hooks/useRestaurantStatus';
import { sendWhatsAppGeneral } from '@/utils/whatsapp';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Menu', href: '#menu' },
  { label: 'Breakfast', href: '#breakfast' },
  { label: 'Lunch', href: '#lunch' },
  { label: 'Dinner', href: '#dinner' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();
  const status = useRestaurantStatus();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#800020] shadow-lg py-2'
            : 'bg-[#800020]/95 py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#FFC107] flex items-center justify-center transition-transform group-hover:scale-110">
              <UtensilsCrossed className="w-5 h-5 text-[#800020]" />
            </div>
            <div className="text-left">
              <h1 className="text-white font-bold text-lg sm:text-xl leading-tight tracking-wide">
                HOTEL RAM
              </h1>
              <p className="text-[#FFC107] text-[10px] sm:text-xs leading-tight">
                Authentic Tamil Nadu Taste
              </p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-white/90 hover:text-[#FFC107] px-3 py-2 text-sm font-medium transition-colors rounded-lg hover:bg-white/10"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Status badge */}
            <div
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                status.isOpen
                  ? 'bg-green-500/20 text-green-300'
                  : 'bg-red-500/20 text-red-300'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                }`}
              />
              {status.isOpen ? 'OPEN NOW' : 'CLOSED'}
            </div>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFC107] text-[#800020] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-in">
                  {totalItems}
                </span>
              )}
            </button>

            {/* WhatsApp button */}
            <button
              onClick={() =>
                sendWhatsAppGeneral(
                  'Hello Hotel Ram, I would like to order food. Please share the available menu.'
                )
              }
              className="hidden sm:flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1eb558] text-white px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-md"
            >
              <Phone className="w-4 h-4" />
              Order on WhatsApp
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
        <nav
          className={`absolute top-0 right-0 h-full w-72 bg-[#800020] shadow-2xl flex flex-col pt-20 px-4 gap-1 transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-left text-white/90 hover:text-[#FFC107] hover:bg-white/10 px-4 py-3 rounded-lg text-base font-medium transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-lg ${
              status.isOpen ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
            }`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                status.isOpen ? 'bg-green-400' : 'bg-red-400'
              }`}
            />
            <span className="text-sm font-semibold">
              {status.isOpen ? `Open Now — ${status.label}` : 'Closed Now'}
            </span>
          </div>
          <button
            onClick={() => {
              setMobileOpen(false);
              sendWhatsAppGeneral(
                'Hello Hotel Ram, I would like to order food. Please share the available menu.'
              );
            }}
            className="bg-[#25D366] hover:bg-[#1eb558] text-white px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 mt-2"
          >
            <Phone className="w-4 h-4" />
            Order on WhatsApp
          </button>
        </nav>
      </div>
    </>
  );
}
