import { CheckCircle2, Sparkles } from 'lucide-react';

const highlights = [
  'Authentic Tamil Nadu Flavors',
  'Freshly Prepared Food',
  'Affordable Prices',
  'Vegetarian & Non-Vegetarian Options',
  'Easy WhatsApp Ordering',
  'Cash on Delivery',
];

export default function About() {
  return (
    <section id="about" className="py-16 bg-[#FFF8F0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.pexels.com/photos/15221855/pexels-photo-15221855.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Authentic South Indian cooking at Hotel Ram"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#FFC107] rounded-xl p-4 shadow-lg hidden sm:block">
              <div className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-[#800020]" />
                <div>
                  <p className="text-[#800020] font-bold text-sm">Traditional</p>
                  <p className="text-[#800020]/70 text-xs">Tamil Nadu Taste</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#800020]/10 text-[#800020] px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              About Hotel Ram
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#800020] mb-4">
              Authentic Tamil Nadu Food in Gattahalli, Bengaluru
            </h2>
            <div className="space-y-3 text-[#252525]/80 text-sm sm:text-base leading-relaxed mb-6">
              <p>
                Welcome to Hotel Ram, your destination for authentic Tamil Nadu-style
                vegetarian and non-vegetarian food in Gattahalli, Bengaluru.
              </p>
              <p>
                We take pride in serving freshly prepared South Indian dishes made with
                traditional flavors and quality ingredients.
              </p>
              <p>
                Whether you're looking for a delicious breakfast, a satisfying lunch, or a
                flavorful dinner, Hotel Ram offers a variety of tasty meals at affordable
                prices.
              </p>
              <p>
                From soft idlis and crispy dosas to chicken biryani, chicken curry, and our
                special kothu parotta, we bring the traditional taste of Tamil Nadu to your
                plate.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-2">
              {highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-2 text-[#252525] text-sm font-medium"
                >
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
