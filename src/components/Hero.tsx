import { Utensils, ChevronDown, Clock } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';
import { useRestaurantStatus } from '@/hooks/useRestaurantStatus';
import { sendWhatsAppGeneral } from '@/utils/whatsapp';

export default function Hero() {
  const status = useRestaurantStatus();

  const scrollToMenu = () => {
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/9609860/pexels-photo-9609860.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
          alt="Authentic South Indian food spread at Hotel Ram"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#800020]/85 via-[#800020]/70 to-[#800020]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center py-16">
        {/* Promo label */}
        <div className="inline-flex items-center gap-2 bg-[#FFC107]/20 backdrop-blur-sm border border-[#FFC107]/40 text-[#FFC107] px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in-up">
          <span className="w-2 h-2 bg-[#FFC107] rounded-full" />
          Fresh Food | Authentic Taste | Affordable Prices
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-4 animate-fade-in-up animation-delay-100">
          WELCOME TO <span className="text-[#FFC107]">HOTEL RAM</span>
        </h1>

        <p className="text-xl sm:text-2xl text-[#FFC107] font-semibold mb-6 animate-fade-in-up animation-delay-200">
          Authentic Tamil Nadu Taste in Bengaluru!
        </p>

        <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed animate-fade-in-up animation-delay-300">
          Enjoy delicious South Indian vegetarian and non-vegetarian dishes, freshly
          prepared with traditional Tamil Nadu flavors. From crispy dosas and soft idlis
          to flavorful chicken biryani and special kothu parotta, every meal brings you
          the taste of home.
        </p>

        {/* Status badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fade-in-up animation-delay-400 ${
            status.isOpen
              ? 'bg-green-500/25 text-green-200 border border-green-400/40'
              : 'bg-red-500/25 text-red-200 border border-red-400/40'
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              status.isOpen ? 'bg-green-400 animate-pulse' : 'bg-red-400'
            }`}
          />
          {status.isOpen ? `Open Now — Serving ${status.label}` : 'Closed Now — Check hours below'}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-500">
          <button
            onClick={() =>
              sendWhatsAppGeneral(
                'Hello Hotel Ram, I would like to order food. Please share the available menu.'
              )
            }
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1eb558] text-white px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl"
          >
            <Utensils className="w-5 h-5" />
            Order on WhatsApp
          </button>
          <button
            onClick={scrollToMenu}
            className="w-full sm:w-auto bg-[#FFC107] hover:bg-[#ffb300] text-[#800020] px-8 py-4 rounded-full text-base font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 shadow-xl"
          >
            <ChevronDown className="w-5 h-5" />
            Explore Our Menu
          </button>
        </div>

        {/* Hours preview */}
        <div className="flex flex-wrap justify-center gap-4 mt-10 animate-fade-in-up animation-delay-600">
          {Object.entries(restaurantConfig.hours).map(([key, h]) => (
            <div
              key={key}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 text-white/90 text-xs sm:text-sm"
            >
              <Clock className="w-3.5 h-3.5 text-[#FFC107]" />
              <span className="capitalize font-medium">{key}:</span>
              <span>{h.start} – {h.end}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
