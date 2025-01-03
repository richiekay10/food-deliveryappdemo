export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'delivered';

export interface Order {
  id: string;
  userId: string;
  items: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: OrderStatus;
  restaurantId: string;
  deliveryAddress: {
    street: string;
    city: string;
    zipCode: string;
    instructions?: string;
  };
  createdAt: Date;
  estimatedDeliveryTime?: Date;
}

export function getOrderStatusStep(status: OrderStatus): number {
  const steps: OrderStatus[] = ['pending', 'confirmed', 'preparing', 'delivering', 'delivered'];
  return steps.indexOf(status) + 1;
}