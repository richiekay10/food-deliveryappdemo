import React from 'react';
import { Heart, MapPin, Settings } from 'lucide-react';
import { UserPreferences } from '../types';

interface UserProfileProps {
  preferences: UserPreferences;
  onUpdatePreferences: (preferences: UserPreferences) => void;
}

export function UserProfile({ preferences, onUpdatePreferences }: UserProfileProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Your Preferences</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="flex items-center text-lg font-medium mb-2">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Favorite Restaurants
            </h3>
            {preferences.favoriteRestaurants.length > 0 ? (
              <div className="space-y-2">
                {preferences.favoriteRestaurants.map((id) => (
                  <div key={id} className="flex items-center justify-between">
                    <span>{id}</span>
                    <button
                      onClick={() => {
                        onUpdatePreferences({
                          ...preferences,
                          favoriteRestaurants: preferences.favoriteRestaurants.filter(
                            (fid) => fid !== id
                          ),
                        });
                      }}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No favorite restaurants yet</p>
            )}
          </div>

          <div>
            <h3 className="flex items-center text-lg font-medium mb-2">
              <MapPin className="w-5 h-5 mr-2 text-blue-500" />
              Default Delivery Address
            </h3>
            {preferences.defaultAddress ? (
              <div className="text-gray-600">
                <p>{preferences.defaultAddress.street}</p>
                <p>
                  {preferences.defaultAddress.city}, {preferences.defaultAddress.zipCode}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No default address set</p>
            )}
          </div>

          <div>
            <h3 className="flex items-center text-lg font-medium mb-2">
              <Settings className="w-5 h-5 mr-2 text-gray-500" />
              Dietary Restrictions
            </h3>
            {preferences.dietaryRestrictions?.length ? (
              <div className="flex flex-wrap gap-2">
                {preferences.dietaryRestrictions.map((restriction) => (
                  <span
                    key={restriction}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {restriction}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No dietary restrictions set</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}