import { Star, Plus } from 'lucide-react';
import { menuItems, formatPrice } from '@/data/menu';
import { useCart } from '@/context/CartContext';

export default function PopularDishes() {
  const { addItem } = useCart();
  const popular = menuItems.filter((item) => item.isPopular);

  return (
    <section className="py-16 bg-gradient-to-b from-[#800020] to-[#6b0019]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFC107]/20 text-[#FFC107] px-4 py-1.5 rounded-full text-sm font-medium mb-3">
            <Star className="w-4 h-4 fill-[#FFC107]" />
            Most Loved by Our Customers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Our Popular Dishes
          </h2>
          <div className="w-20 h-1 bg-[#FFC107] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {popular.map((item) => (
            <div
              key={item.id}
              className="group bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-3">
                <h4 className="text-white font-semibold text-sm leading-tight mb-1 line-clamp-1">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-[#FFC107] font-bold text-base">
                    {formatPrice(item.options ? item.options[0].price : item.price)}
                    {item.options && (
                      <span className="text-[10px] text-white/60">+</span>
                    )}
                  </span>
                  <button
                    onClick={() => addItem(item)}
                    className="w-8 h-8 rounded-full bg-[#FFC107] hover:bg-[#ffb300] text-[#800020] flex items-center justify-center transition-all hover:scale-110"
                    aria-label={`Add ${item.name} to cart`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
