import { useState, useEffect } from 'react';
import { restaurantConfig } from '@/data/menu';

export type RestaurantStatus = {
  isOpen: boolean;
  currentMeal: 'breakfast' | 'lunch' | 'dinner' | null;
  label: string;
};

function getStatus(): RestaurantStatus {
  const now = new Date();
  // Convert to IST (Asia/Kolkata = UTC+5:30)
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const istMinutes = (utcMinutes + 330) % 1440;

  const { breakfast, lunch, dinner } = restaurantConfig.hours;

  if (istMinutes >= breakfast.startMin && istMinutes < breakfast.endMin) {
    return { isOpen: true, currentMeal: 'breakfast', label: 'Breakfast' };
  }
  if (istMinutes >= lunch.startMin && istMinutes < lunch.endMin) {
    return { isOpen: true, currentMeal: 'lunch', label: 'Lunch' };
  }
  if (istMinutes >= dinner.startMin && istMinutes < dinner.endMin) {
    return { isOpen: true, currentMeal: 'dinner', label: 'Dinner' };
  }
  return { isOpen: false, currentMeal: null, label: 'Closed' };
}

export function useRestaurantStatus(): RestaurantStatus {
  const [status, setStatus] = useState<RestaurantStatus>(getStatus);

  useEffect(() => {
    const interval = setInterval(() => setStatus(getStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
