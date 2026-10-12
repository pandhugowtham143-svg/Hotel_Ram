import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryCards from '@/components/CategoryCards';
import PopularDishes from '@/components/PopularDishes';
import MenuSection from '@/components/MenuSection';
import SpecialParotta from '@/components/SpecialParotta';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import Checkout from '@/components/Checkout';
import FloatingActions from '@/components/FloatingActions';

function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#FFF8F0] text-[#252525] font-poppins pb-16 lg:pb-0">
        <Header />
        <main>
          <Hero />
          <CategoryCards />
          <PopularDishes />
          <MenuSection />
          <SpecialParotta />
          <About />
          <Contact />
        </main>
        <Footer />

        {/* Overlays */}
        <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
        <Checkout isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
        <FloatingActions />
      </div>
    </CartProvider>
  );
}

export default App;
