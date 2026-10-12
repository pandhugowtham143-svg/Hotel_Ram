import { MapPin, Phone, Clock, MessageCircle, Navigation, Coffee, Utensils, Moon } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';
import { sendWhatsAppGeneral } from '@/utils/whatsapp';
import { useRestaurantStatus } from '@/hooks/useRestaurantStatus';

export default function Contact() {
  const status = useRestaurantStatus();

  const hours = [
    { label: 'Breakfast', time: '7:30 AM – 10:30 AM', icon: <Coffee className="w-5 h-5" /> },
    { label: 'Lunch', time: '12:30 PM – 3:00 PM', icon: <Utensils className="w-5 h-5" /> },
    { label: 'Dinner', time: '6:30 PM – 9:30 PM', icon: <Moon className="w-5 h-5" /> },
  ];

  return (
    <section id="contact" className="py-16 bg-[#FFF8F0] scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#800020] mb-3">
            Contact Hotel Ram
          </h2>
          <p className="text-[#252525]/70 max-w-xl mx-auto">
            Visit us, call us, or order on WhatsApp — we're here to serve you.
          </p>
          <div className="w-20 h-1 bg-[#FFC107] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact details */}
          <div className="bg-white rounded-2xl p-6 shadow-lg space-y-5">
            {/* Address */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#800020]/10 flex items-center justify-center text-[#800020] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#252525] text-sm mb-1">Address</h3>
                <p className="text-[#252525]/70 text-sm leading-relaxed">
                  {restaurantConfig.address}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#800020]/10 flex items-center justify-center text-[#800020] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-[#252525] text-sm mb-1">Phone & WhatsApp</h3>
                <p className="text-[#252525]/70 text-sm">{restaurantConfig.phone}</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-[#800020]/10 flex items-center justify-center text-[#800020] shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#252525] text-sm mb-2">Opening Hours</h3>
                <div className="space-y-2">
                  {hours.map((h) => (
                    <div
                      key={h.label}
                      className="flex items-center gap-2 text-[#252525]/70 text-sm"
                    >
                      <span className="text-[#800020]">{h.icon}</span>
                      <span className="font-medium w-20">{h.label}</span>
                      <span>{h.time}</span>
                    </div>
                  ))}
                </div>
                <div
                  className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    status.isOpen
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status.isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
                    }`}
                  />
                  {status.isOpen ? `Open Now — ${status.label}` : 'Closed Now'}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={restaurantConfig.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#800020] hover:bg-[#6b0019] text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              <a
                href={`tel:${restaurantConfig.phoneRaw}`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>
              <button
                onClick={() =>
                  sendWhatsAppGeneral(
                    'Hello Hotel Ram, I would like to order food. Please share the available menu.'
                  )
                }
                className="flex items-center gap-2 bg-[#25D366] hover:bg-[#1eb558] text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </button>
            </div>
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg min-h-[300px] bg-white">
            <iframe
              title="Hotel Ram location map"
              src="https://www.google.com/maps?q=Gattahalli+Bengaluru+Karnataka+560099&output=embed"
              className="w-full h-full min-h-[300px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
