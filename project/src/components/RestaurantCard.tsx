import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: (id: string) => void;
}

export function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div 
      onClick={() => onClick(restaurant.id)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
    >
      <img 
        src={restaurant.image} 
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{restaurant.name}</h3>
        <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-medium">{restaurant.rating}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{restaurant.deliveryTime}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Min. order: ${restaurant.minimumOrder}
        </p>
      </div>
    </div>
  );
}