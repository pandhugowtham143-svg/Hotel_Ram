import { Flame, Plus } from 'lucide-react';
import { menuItems, formatPrice } from '@/data/menu';
import { useCart } from '@/context/CartContext';

export default function SpecialParotta() {
  const { addItem } = useCart();
  const specials = menuItems.filter(
    (item) => item.id === 'chicken-kothu-parotta' || item.id === 'egg-kothu-parotta'
  );

  return (
    <section className="py-16 bg-[#FFF8F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-red-600/10 text-red-600 px-4 py-1.5 rounded-full text-sm font-medium mb-3">
            <Flame className="w-4 h-4" />
            Tamil Nadu Special Parotta
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#800020] mb-3">
            Signature Kothu Parotta
          </h2>
          <p className="text-[#252525]/70 max-w-xl mx-auto">
            Authentic Tamil Nadu-style parotta chopped on a hot griddle with meat, eggs,
            and aromatic spices. A must-try!
          </p>
          <div className="w-20 h-1 bg-[#FFC107] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {specials.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-[#FFC107] text-[#800020] text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                  <Flame className="w-3 h-3" />
                  Must Try
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#800020] mb-2">{item.name}</h3>
                <p className="text-[#252525]/70 text-sm leading-relaxed mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#800020] font-bold text-2xl">
                    {formatPrice(item.price)}
                  </span>
                  <button
                    onClick={() => addItem(item)}
                    className="flex items-center gap-2 bg-[#800020] hover:bg-[#6b0019] text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
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
