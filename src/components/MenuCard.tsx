import { useState } from 'react';
import { Plus, Leaf, Drumstick, Clock, Star, Check } from 'lucide-react';
import type { MenuItem } from '@/data/menu';
import { formatPrice, restaurantConfig } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { useRestaurantStatus } from '@/hooks/useRestaurantStatus';

const mealAvailabilityMap = {
  breakfast: 'Available during breakfast hours',
  lunch: 'Available during lunch hours',
  dinner: 'Available during dinner hours',
} as const;

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();
  const status = useRestaurantStatus();
  const [selectedOption, setSelectedOption] = useState(0);
  const [added, setAdded] = useState(false);

  const currentPrice = item.options ? item.options[selectedOption].price : item.price;
  const currentOptionLabel = item.options ? item.options[selectedOption].label : undefined;

  const isAvailableNow = status.isOpen && status.currentMeal === item.category;

  const handleAdd = () => {
    addItem(item, currentOptionLabel, currentPrice);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Diet indicator */}
        <div
          className={`absolute top-3 left-3 w-7 h-7 rounded-full flex items-center justify-center shadow-md ${
            item.diet === 'veg'
              ? 'bg-green-600'
              : 'bg-red-600'
          }`}
          title={item.diet === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
        >
          {item.diet === 'veg' ? (
            <Leaf className="w-4 h-4 text-white" />
          ) : (
            <Drumstick className="w-4 h-4 text-white" />
          )}
        </div>
        {/* Special badge */}
        {item.isSpecial && (
          <div className="absolute top-3 right-3 bg-[#FFC107] text-[#800020] text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-[#800020]" />
            Special
          </div>
        )}
        {/* Availability badge */}
        {!isAvailableNow && (
          <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {mealAvailabilityMap[item.category]}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-[#252525] text-base sm:text-lg leading-tight mb-1">
          {item.name}
        </h3>
        <p className="text-[#252525]/60 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Options selector */}
        {item.options && (
          <select
            value={selectedOption}
            onChange={(e) => setSelectedOption(Number(e.target.value))}
            className="w-full mb-3 px-3 py-2 rounded-lg border border-[#800020]/20 text-sm text-[#252525] bg-[#FFF8F0] focus:outline-none focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/30 transition-all"
            aria-label={`Select portion for ${item.name}`}
          >
            {item.options.map((opt, idx) => (
              <option key={idx} value={idx}>
                {opt.label} — {formatPrice(opt.price)}
              </option>
            ))}
          </select>
        )}

        {/* Price + Add */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div>
            <span className="text-[#800020] font-bold text-lg sm:text-xl">
              {formatPrice(currentPrice)}
            </span>
            <span className="text-[#252525]/50 text-xs ml-1">
              / {item.options ? item.options[selectedOption].label.split(' ')[0] : item.quantity}
            </span>
          </div>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-sm ${
              added
                ? 'bg-green-600 text-white'
                : 'bg-[#800020] text-white hover:bg-[#6b0019]'
            }`}
            aria-label={`Add ${item.name} to cart`}
          >
            {added ? (
              <>
                <Check className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Add
              </>
            )}
          </button>
        </div>

        {!isAvailableNow && (
          <p className="text-[#252525]/40 text-[10px] mt-2 italic">
            {restaurantConfig.hours[item.category].start} – {restaurantConfig.hours[item.category].end}
          </p>
        )}
      </div>
    </div>
  );
}
