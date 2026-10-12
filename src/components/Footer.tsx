import { UtensilsCrossed, Phone, MapPin, MessageCircle, CreditCard } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';
import { sendWhatsAppGeneral } from '@/utils/whatsapp';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Menu', href: '#menu' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#5c0014] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-[#FFC107] flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-[#800020]" />
              </div>
              <h3 className="text-xl font-bold">HOTEL RAM</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Authentic Tamil Nadu Taste in Every Bite.
            </p>
            <p className="text-[#FFC107] text-xs mt-2 italic">
              {restaurantConfig.tagline}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-[#FFC107] text-sm uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-white/70 hover:text-[#FFC107] text-sm transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-[#FFC107] text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-3 text-sm">
              <a
                href={`tel:${restaurantConfig.phoneRaw}`}
                className="flex items-center gap-2 text-white/70 hover:text-[#FFC107] transition-colors"
              >
                <Phone className="w-4 h-4" />
                {restaurantConfig.phone}
              </a>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4" />
                {restaurantConfig.addressShort}
              </div>
              <button
                onClick={() =>
                  sendWhatsAppGeneral(
                    'Hello Hotel Ram, I would like to order food. Please share the available menu.'
                  )
                }
                className="flex items-center gap-2 text-white/70 hover:text-[#FFC107] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Orders Available
              </button>
              <div className="flex items-center gap-2 text-white/70">
                <CreditCard className="w-4 h-4" />
                Cash on Delivery Available
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-[#FFC107] text-sm uppercase tracking-wider mb-4">
              Opening Hours
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Breakfast: 7:30 AM – 10:30 AM</li>
              <li>Lunch: 12:30 PM – 3:00 PM</li>
              <li>Dinner: 6:30 PM – 9:30 PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/50 text-xs sm:text-sm">
            © 2026 Hotel Ram. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
