import React from 'react';
import { Package, Heart, CreditCard, MapPin, Settings, LogOut, ShoppingBag, User, ChevronDown, SlidersHorizontal } from 'lucide-react';

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  setSelectedCategory: (category: string) => void;
  setShowCart: (show: boolean) => void;
  setShowWishlist: (show: boolean) => void;
  setShowOrders: (show: boolean) => void;
  setShowPayments: (show: boolean) => void;
  setShowAddresses: (show: boolean) => void;
  setShowSettings: (show: boolean) => void;
  cartItems: any[];
  calculateTotal: () => string;
  toggleCategory: (category: string) => void;
  expandedCategories: {
    profile: boolean;
    cart: boolean;
    clothing: boolean;
    accessories: boolean;
    filters: boolean;
  };
  categoryGroups: {
    clothing: string[];
    accessories: string[];
  };
  user: any;
  onLogout: () => void;
  filters: any;
  setFilters: (filters: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  showSidebar,
  setSelectedCategory,
  setShowCart,
  setShowWishlist,
  setShowOrders,
  setShowPayments,
  setShowAddresses,
  setShowSettings,
  cartItems,
  calculateTotal,
  toggleCategory,
  expandedCategories,
  categoryGroups,
  user,
  onLogout,
  filters,
  setFilters,
}) => {
  return (
    <div className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-white shadow-lg z-40 transition-all duration-300 ${showSidebar ? 'w-64' : 'w-0'} overflow-hidden`}>
      <div className="h-full flex flex-col">
        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {user ? (
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-4 p-3 bg-indigo-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowOrders(true)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Package className="w-5 h-5" />
                    <span>My Orders</span>
                  </button>
                  <button
                    onClick={() => setShowWishlist(true)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Heart className="w-5 h-5" />
                    <span>Wishlist</span>
                  </button>
                  <button
                    onClick={() => setShowPayments(true)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <CreditCard className="w-5 h-5" />
                    <span>Payment Methods</span>
                  </button>
                  <button
                    onClick={() => setShowAddresses(true)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <MapPin className="w-5 h-5" />
                    <span>Addresses</span>
                  </button>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-indigo-50 rounded-lg">
                <p className="text-center mb-4">Sign in to access your account</p>
                <button className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                  Sign In
                </button>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <span className="bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              </div>
              <div className="space-y-4 max-h-48 overflow-y-auto">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-gray-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              {cartItems.length > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Total:</span>
                    <span className="font-semibold">${calculateTotal()}</span>
                  </div>
                  <button
                    onClick={() => setShowCart(true)}
                    className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    View Cart
                  </button>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                >
                  All Products
                </button>

                {/* Filters Section */}
                <div className="border-b border-gray-200 pb-2">
                  <button
                    onClick={() => toggleCategory('filters')}
                    className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    <div className="flex items-center">
                      <SlidersHorizontal className="w-5 h-5 mr-2" />
                      <span>Filters</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategories.filters ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedCategories.filters && (
                    <div className="ml-4 space-y-4 mt-2 p-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Price Range
                        </label>
                        <select
                          value={filters.priceRange}
                          onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                          className="w-full border rounded-lg p-2 text-sm"
                        >
                          <option value="all">All Prices</option>
                          <option value="0-50">$0 - $50</option>
                          <option value="50-100">$50 - $100</option>
                          <option value="100-200">$100 - $200</option>
                          <option value="200+">$200+</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Size
                        </label>
                        <select
                          value={filters.size}
                          onChange={(e) => setFilters({ ...filters, size: e.target.value })}
                          className="w-full border rounded-lg p-2 text-sm"
                        >
                          <option value="all">All Sizes</option>
                          <option value="xs">XS</option>
                          <option value="s">S</option>
                          <option value="m">M</option>
                          <option value="l">L</option>
                          <option value="xl">XL</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Color
                        </label>
                        <select
                          value={filters.color}
                          onChange={(e) => setFilters({ ...filters, color: e.target.value })}
                          className="w-full border rounded-lg p-2 text-sm"
                        >
                          <option value="all">All Colors</option>
                          <option value="black">Black</option>
                          <option value="white">White</option>
                          <option value="blue">Blue</option>
                          <option value="red">Red</option>
                          <option value="green">Green</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Sort By
                        </label>
                        <select
                          value={filters.sort}
                          onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                          className="w-full border rounded-lg p-2 text-sm"
                        >
                          <option value="newest">Newest First</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="popular">Most Popular</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Categories */}
                {Object.entries(categoryGroups).map(([group, items]) => (
                  <div key={group} className="border-b border-gray-200 pb-2">
                    <button
                      onClick={() => toggleCategory(group)}
                      className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <span className="capitalize">{group}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedCategories[group] ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedCategories[group] && (
                      <div className="ml-4 space-y-1 mt-1">
                        {items.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Fixed bottom section */}
        {user && (
          <div className="p-4 border-t">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
