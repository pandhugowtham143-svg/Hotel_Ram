export interface CartItem {
  id: string;
  menuItemId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  optionLabel?: string;
  diet: 'veg' | 'non-veg';
  category: 'breakfast' | 'lunch' | 'dinner';
}
