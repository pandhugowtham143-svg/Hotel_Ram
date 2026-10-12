import { useState, useMemo } from 'react';
import { Search, Coffee, Utensils, Moon } from 'lucide-react';
import { menuItems } from '@/data/menu';
import type { MenuCategory } from '@/data/menu';
import MenuCard from './MenuCard';

type FilterType = 'all' | 'veg' | 'non-veg' | MenuCategory;

const filters: { label: string; value: FilterType }[] = [
  { label: 'All Foods', value: 'all' },
  { label: 'Vegetarian', value: 'veg' },
  { label: 'Non-Veg', value: 'non-veg' },
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Lunch', value: 'lunch' },
  { label: 'Dinner', value: 'dinner' },
];

const sectionConfig = [
  {
    id: 'breakfast',
    title: 'Breakfast Menu',
    icon: <Coffee className="w-5 h-5" />,
    time: '7:30 AM – 10:30 AM',
    category: 'breakfast' as MenuCategory,
  },
  {
    id: 'lunch',
    title: 'Lunch Specials',
    icon: <Utensils className="w-5 h-5" />,
    time: '12:30 PM – 3:00 PM',
    category: 'lunch' as MenuCategory,
  },
  {
    id: 'dinner',
    title: 'Dinner Menu',
    icon: <Moon className="w-5 h-5" />,
    time: '6:30 PM – 9:30 PM',
    category: 'dinner' as MenuCategory,
  },
];

export default function MenuSection() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        search.trim() === '' ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === 'all' ||
        (filter === 'veg' && item.diet === 'veg') ||
        (filter === 'non-veg' && item.diet === 'non-veg') ||
        item.category === filter;

      return matchesSearch && matchesFilter;
    });
  }, [filter, search]);

  return (
    <section id="menu" className="py-16 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#800020] mb-3">
            Our Complete Menu
          </h2>
          <p className="text-[#252525]/70 max-w-xl mx-auto">
            Browse all our dishes — filter by category, diet, or search by name.
          </p>
          <div className="w-20 h-1 bg-[#FFC107] mx-auto mt-4 rounded-full" />
        </div>

        {/* Search + Filters */}
        <div className="sticky top-[64px] z-30 bg-[#FFF8F0]/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:mx-0 sm:px-0 rounded-lg mb-8">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#252525]/40" />
            <input
              type="text"
              placeholder="Search dishes... e.g. Chicken, Dosa, Parotta"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-[#800020]/15 bg-white text-[#252525] text-sm focus:outline-none focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/30 transition-all shadow-sm"
              aria-label="Search food items"
            />
          </div>
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === f.value
                    ? 'bg-[#800020] text-white shadow-md scale-105'
                    : 'bg-white text-[#252525]/70 hover:bg-[#800020]/10 border border-[#800020]/15'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Sections */}
        {sectionConfig.map((section) => {
          const sectionItems = filteredItems.filter(
            (item) => item.category === section.category
          );
          if (sectionItems.length === 0) return null;

          return (
            <div key={section.id} id={section.id} className="mb-14 scroll-mt-32">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 rounded-full bg-[#800020] flex items-center justify-center text-[#FFC107]">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#800020]">{section.title}</h3>
                  <p className="text-[#252525]/60 text-sm">{section.time}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {sectionItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          );
        })}

        {/* No results */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[#252525]/50 text-lg">
              No dishes found. Try a different search or filter.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
