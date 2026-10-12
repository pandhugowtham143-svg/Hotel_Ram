import { Sun, Utensils, Moon, ArrowRight } from 'lucide-react';
import { restaurantConfig } from '@/data/menu';

interface CategoryCardProps {
  title: string;
  timeRange: string;
  image: string;
  icon: React.ReactNode;
  targetId: string;
}

function CategoryCard({ title, timeRange, image, icon, targetId }: CategoryCardProps) {
  const handleClick = () => {
    document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={handleClick}
      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-left w-full"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#800020]/95 via-[#800020]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-[#FFC107] flex items-center justify-center text-[#800020]">
            {icon}
          </div>
          <span className="text-[#FFC107] text-xs font-medium bg-black/30 backdrop-blur-sm px-2 py-1 rounded-full">
            {timeRange}
          </span>
        </div>
        <h3 className="text-white font-bold text-lg sm:text-xl mb-2">{title}</h3>
        <span className="inline-flex items-center gap-1 text-[#FFC107] text-sm font-semibold group-hover:gap-2 transition-all">
          View Menu <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </button>
  );
}

export default function CategoryCards() {
  return (
    <section className="py-16 bg-[#FFF8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#800020] mb-3">
            Our Food Categories
          </h2>
          <p className="text-[#252525]/70 max-w-xl mx-auto">
            Three meals a day, each prepared fresh with authentic Tamil Nadu flavors.
          </p>
          <div className="w-20 h-1 bg-[#FFC107] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            title="Breakfast Specials"
            timeRange={`${restaurantConfig.hours.breakfast.start} – ${restaurantConfig.hours.breakfast.end}`}
            image="https://images.pexels.com/photos/20422123/pexels-photo-20422123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            icon={<Sun className="w-5 h-5" />}
            targetId="#breakfast"
          />
          <CategoryCard
            title="Lunch Specials"
            timeRange={`${restaurantConfig.hours.lunch.start} – ${restaurantConfig.hours.lunch.end}`}
            image="https://images.pexels.com/photos/39536492/pexels-photo-39536492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            icon={<Utensils className="w-5 h-5" />}
            targetId="#lunch"
          />
          <CategoryCard
            title="Dinner Specials"
            timeRange={`${restaurantConfig.hours.dinner.start} – ${restaurantConfig.hours.dinner.end}`}
            image="https://images.pexels.com/photos/9609840/pexels-photo-9609840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
            icon={<Moon className="w-5 h-5" />}
            targetId="#dinner"
          />
        </div>
      </div>
    </section>
  );
}
