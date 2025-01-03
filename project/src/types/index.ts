// Existing types...

export interface Review {
  id: string;
  userId: string;
  restaurantId: string;
  rating: number;
  comment: string;
  createdAt: Date;
  userName: string;
}

export interface OrderHistory {
  orders: Order[];
  totalOrders: number;
  totalSpent: number;
}

export interface UserPreferences {
  favoriteRestaurants: string[];
  dietaryRestrictions?: string[];
  defaultAddress?: DeliveryAddress;
}