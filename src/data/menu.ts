export type MenuCategory = 'breakfast' | 'lunch' | 'dinner';
export type DietType = 'veg' | 'non-veg';

export interface MenuOption {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: MenuCategory;
  diet: DietType;
  image: string;
  quantity: string;
  price: number;
  options?: MenuOption[];
  isSpecial?: boolean;
  isPopular?: boolean;
}

export const menuItems: MenuItem[] = [
  // BREAKFAST
  {
    id: 'idli',
    name: 'Idli',
    description: 'Soft, steamed South Indian rice cakes served with sambar and chutney.',
    category: 'breakfast',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/4331489/pexels-photo-4331489.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 50,
    isPopular: false,
  },
  {
    id: 'poori',
    name: 'Poori',
    description: 'Crispy, puffy deep-fried bread served with potato masala.',
    category: 'breakfast',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/1080314/pexels-photo-1080314.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 50,
  },
  {
    id: 'plain-dosa',
    name: 'Plain Dosa',
    description: 'Crispy golden rice crepe served with coconut chutney and sambar.',
    category: 'breakfast',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/20422133/pexels-photo-20422133.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Serving',
    price: 40,
  },
  {
    id: 'masala-dosa',
    name: 'Masala Dosa',
    description: 'Crispy dosa stuffed with spiced potato masala — a South Indian classic.',
    category: 'breakfast',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/20422138/pexels-photo-20422138.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Serving',
    price: 60,
    isPopular: true,
  },
  {
    id: 'set-dosa',
    name: 'Set Dosa',
    description: 'Soft, fluffy set of dosas served with vegetable curry and chutney.',
    category: 'breakfast',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/20422129/pexels-photo-20422129.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Serving',
    price: 50,
  },
  {
    id: 'egg-dosa',
    name: 'Egg Dosa',
    description: 'Crispy dosa topped with a beaten egg cooked to perfection.',
    category: 'breakfast',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/20422126/pexels-photo-20422126.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Serving',
    price: 50,
    options: [
      { label: 'Single Egg', price: 50 },
      { label: 'Double Egg', price: 60 },
    ],
  },
  {
    id: 'onion-dosa',
    name: 'Onion Dosa',
    description: 'Crispy dosa sprinkled with chopped onions and green chilies.',
    category: 'breakfast',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/20422131/pexels-photo-20422131.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Serving',
    price: 50,
  },
  {
    id: 'omelette',
    name: 'Omelette',
    description: 'Fluffy egg omelette with onions, green chilies, and spices.',
    category: 'breakfast',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/12944792/pexels-photo-12944792.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Serving',
    price: 20,
  },
  {
    id: 'half-boiled-egg',
    name: 'Half-Boiled Egg',
    description: 'Perfectly half-boiled egg with a sprinkle of salt and pepper.',
    category: 'breakfast',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/28573374/pexels-photo-28573374.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Egg',
    price: 15,
  },
  {
    id: 'veg-pulao',
    name: 'Veg Pulao',
    description: 'Fragrant basmati rice cooked with mixed vegetables and aromatic spices.',
    category: 'breakfast',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/35041654/pexels-photo-35041654.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 50,
  },
  {
    id: 'lemon-rice',
    name: 'Lemon Rice',
    description: 'Tangy rice tempered with mustard seeds, curry leaves, and lemon juice.',
    category: 'breakfast',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/35267286/pexels-photo-35267286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 50,
  },
  {
    id: 'vada',
    name: 'Vada',
    description: 'Crispy golden medu vada — a savoury lentil donut with chutney.',
    category: 'breakfast',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/20422135/pexels-photo-20422135.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Piece',
    price: 10,
  },

  // LUNCH
  {
    id: 'chicken-biryani',
    name: 'Chicken Biryani',
    description: 'Aromatic basmati rice layered with tender chicken and authentic Tamil Nadu spices.',
    category: 'lunch',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/39536492/pexels-photo-39536492.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 110,
    isSpecial: true,
    isPopular: true,
  },
  {
    id: 'chicken-kebab',
    name: 'Chicken Kebab',
    description: 'Juicy, char-grilled chicken kebabs marinated in traditional spices.',
    category: 'lunch',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/7301037/pexels-photo-7301037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Portion',
    price: 50,
    options: [
      { label: 'Half Portion', price: 50 },
      { label: 'Full Portion', price: 100 },
    ],
  },
  {
    id: 'rice-chicken-gravy',
    name: 'Rice with Chicken Gravy',
    description: 'Steamed rice served with rich, spicy chicken gravy — a Tamil Nadu favourite.',
    category: 'lunch',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/38400477/pexels-photo-38400477.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 120,
  },
  {
    id: 'south-indian-meals',
    name: 'South Indian Meals',
    description: 'Complete vegetarian meals with rice, sambar, rasam, curry, and papad.',
    category: 'lunch',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/20422123/pexels-photo-20422123.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 60,
  },
  {
    id: 'chapati',
    name: 'Chapati',
    description: 'Soft whole wheat chapatis served with vegetable curry.',
    category: 'lunch',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/35189865/pexels-photo-35189865.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Serving',
    price: 50,
  },

  // DINNER
  {
    id: 'chicken-fried-rice',
    name: 'Chicken Fried Rice',
    description: 'Wok-tossed rice with chicken, vegetables, and aromatic spices.',
    category: 'dinner',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/24206106/pexels-photo-24206106.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 100,
    isPopular: true,
  },
  {
    id: 'egg-fried-rice',
    name: 'Egg Fried Rice',
    description: 'Fried rice with scrambled egg, vegetables, and spices.',
    category: 'dinner',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/28503589/pexels-photo-28503589.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 60,
    options: [
      { label: 'Single Egg', price: 60 },
      { label: 'Double Egg', price: 70 },
    ],
  },
  {
    id: 'chicken-kebab-dinner',
    name: 'Chicken Kebab',
    description: 'Juicy, char-grilled chicken kebabs marinated in traditional spices.',
    category: 'dinner',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/7301037/pexels-photo-7301037.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Portion',
    price: 50,
    options: [
      { label: 'Half Portion', price: 50 },
      { label: 'Full Portion', price: 100 },
    ],
  },
  {
    id: 'chicken-curry',
    name: 'Chicken Curry',
    description: 'Tender chicken cooked in a rich, spicy Tamil Nadu-style gravy.',
    category: 'dinner',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/35532821/pexels-photo-35532821.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Portion',
    price: 60,
    options: [
      { label: 'Half Portion', price: 60 },
      { label: 'Full Portion', price: 120 },
    ],
    isPopular: true,
  },
  {
    id: 'plain-parotta',
    name: 'Plain Parotta',
    description: 'Flaky, layered South Indian parotta — soft on the inside, crispy outside.',
    category: 'dinner',
    diet: 'veg',
    image: 'https://images.pexels.com/photos/9609857/pexels-photo-9609857.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '2 Pieces',
    price: 40,
  },
  {
    id: 'chicken-kothu-parotta',
    name: 'Chicken Kothu Parotta',
    description: 'Authentic Tamil Nadu-style parotta chopped and mixed with chicken, eggs, and aromatic spices.',
    category: 'dinner',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/9609840/pexels-photo-9609840.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 140,
    isSpecial: true,
    isPopular: true,
  },
  {
    id: 'egg-kothu-parotta',
    name: 'Egg Kothu Parotta',
    description: 'Traditional South Indian parotta mixed with eggs and flavorful spices.',
    category: 'dinner',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/39833413/pexels-photo-39833413.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Plate',
    price: 90,
    isPopular: true,
  },
  {
    id: 'chicken-liver',
    name: 'Chicken Liver',
    description: 'Tender chicken liver cooked in spicy Tamil Nadu-style masala.',
    category: 'dinner',
    diet: 'non-veg',
    image: 'https://images.pexels.com/photos/6113813/pexels-photo-6113813.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    quantity: '1 Portion',
    price: 60,
    options: [
      { label: 'Half Portion', price: 60 },
      { label: 'Full Portion', price: 120 },
    ],
  },
];

export const restaurantConfig = {
  name: 'Hotel Ram',
  tagline: 'Authentic Tamil Nadu Taste, Served with Love!',
  phone: '+91 9361192442',
  phoneRaw: '+919361192442',
  whatsappNumber: '919361192442',
  whatsappLink: 'https://wa.me/919361192442',
  address: 'Nirmala Vidyalaya Road, Gattahalli, Ghattihalli, Karnataka – 560099, India.',
  addressShort: 'Gattahalli, Bengaluru – 560099',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Hotel+Ram+Gattahalli+Bengaluru+Karnataka+560099',
  currency: '₹',
  deliveryCharge: 0,
  hours: {
    breakfast: { start: '7:30 AM', end: '10:30 AM', startMin: 7 * 60 + 30, endMin: 10 * 60 + 30 },
    lunch: { start: '12:30 PM', end: '3:00 PM', startMin: 12 * 60 + 30, endMin: 15 * 60 },
    dinner: { start: '6:30 PM', end: '9:30 PM', startMin: 18 * 60 + 30, endMin: 21 * 60 + 30 },
  },
};

export function formatPrice(amount: number): string {
  return `${restaurantConfig.currency}${amount}`;
}
