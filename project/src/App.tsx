import React, { useState } from 'react';
import { ShoppingBag, User } from 'lucide-react';
import { RestaurantCard } from './components/RestaurantCard';
import { Cart } from './components/Cart';
import { MenuItem } from './components/MenuItem';
import { SearchBar } from './components/SearchBar';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderTracker } from './components/OrderTracker';
import { AuthModal } from './components/AuthModal';
import { restaurants } from './data/restaurants';
import { menuItems } from './data/menuItems';
import { auth } from './utils/auth';
import { CartItem, DeliveryAddress } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<any>(null);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestaurantClick = (id: string) => {
    setSelectedRestaurant(id);
  };

  const handleAddToCart = (item: CartItem) => {
    setCartItems(items => {
      const existingItem = items.find(i => i.id === item.id);
      if (existingItem) {
        return items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...items, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    setCartItems(items => {
      if (quantity <= 0) {
        return items.filter(item => item.id !== itemId);
      }
      return items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      );
    });
  };

  const handleCheckout = () => {
    if (!auth.isAuthenticated()) {
      setShowAuthModal(true);
      return;
    }
    setShowCheckout(true);
  };

  const handlePlaceOrder = (address: DeliveryAddress) => {
    const order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: auth.user!.id,
      items: cartItems,
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      status: 'pending',
      restaurantId: cartItems[0].restaurantId,
      deliveryAddress: address,
      createdAt: new Date(),
      estimatedDeliveryTime: new Date(Date.now() + 45 * 60000), // 45 minutes from now
    };
    setCurrentOrder(order);
    setCartItems([]);
    setShowCheckout(false);
    setIsCartOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">FoodDelivery</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => auth.isAuthenticated() ? auth.logout() : setShowAuthModal(true)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <User className="w-6 h-6" />
              </button>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="relative p-2 rounded-full hover:bg-gray-100"
              >
                <ShoppingBag className="w-6 h-6" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentOrder ? (
          <OrderTracker order={currentOrder} />
        ) : selectedRestaurant ? (
          <div>
            <button
              onClick={() => setSelectedRestaurant(null)}
              className="mb-6 text-blue-600 hover:text-blue-700"
            >
              ← Back to restaurants
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems[selectedRestaurant].map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                onClick={handleRestaurantClick}
              />
            ))}
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="p-4 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
              <Cart
                items={cartItems}
                onUpdateQuantity={updateCartQuantity}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-full max-w-md m-4">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Checkout</h2>
                <button
                  onClick={() => setShowCheckout(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
              <CheckoutForm
                items={cartItems}
                onSubmit={handlePlaceOrder}
              />
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => {
            setShowAuthModal(false);
            if (cartItems.length > 0) {
              setShowCheckout(true);
            }
          }}
        />
      )}
    </div>
  );
}

export default App;