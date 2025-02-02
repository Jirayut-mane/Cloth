import React, { useState, useMemo } from 'react';
import { ShoppingCart, User, Search, ChevronRight, ChevronLeft, SlidersHorizontal, X, Settings, LogOut, Heart, Menu, ChevronDown } from 'lucide-react';
import { categories, products } from '../data';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import HeroSlider from './HeroSlider';
import ProductCard from './ProductCard';
import ProductDetailModal from './ProductDetailModal';
import CartPage from './CartPage';
import WishlistPage from './WishlistPage';
import FilterPopup from './FilterPopup';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import OrdersPage from './OrdersPage';
import PaymentMethodsPage from './PaymentMethodsPage';
import AddressesPage from './AddressesPage';
import SettingsPage from './SettingsPage';
import MyProfilePage from './MyProfilePage';
import { useAuth } from '../contexts/AuthContext';
import ForgotPasswordForm from './ForgotPasswordForm';

function AppContent() {
  const { isDark } = useTheme();
  const { user, logout } = useAuth();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [showAddresses, setShowAddresses] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [filters, setFilters] = useState({
    sort: 'newest'
  });
  const [expandedCategories, setExpandedCategories] = useState({
    profile: false,
    cart: false,
    clothing: false,
    accessories: false,
    filters: false
  });
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const categoryGroups = {
    clothing: ['T-Shirts', 'Pants', 'Dresses', 'Jackets'],
    accessories: ['Jewelry', 'Bags', 'Shoes']
  };

  const featuredProducts = products.slice(0, 3);
  
  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (filters.sort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }
    return filtered;
  }, [selectedCategory, filters.sort]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowSidebar(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const addToCart = (product: any) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, change: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const toggleWishlist = (product: any) => {
    setWishlistItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleLogout = async () => {
    await logout();
    setShowSidebar(false);
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setShowLogin={setShowLogin}
        setShowCart={setShowCart}
        setShowWishlist={setShowWishlist}
        cartItemsCount={cartItems.length}
        wishlistItemsCount={wishlistItems.length}
        user={user}
      />

      <div className="flex">
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          setSelectedCategory={handleCategorySelect}
          setShowCart={setShowCart}
          setShowWishlist={setShowWishlist}
          setShowOrders={setShowOrders}
          setShowPayments={setShowPayments}
          setShowAddresses={setShowAddresses}
          setShowSettings={setShowSettings}
          setShowProfile={setShowProfile}
          cartItems={cartItems}
          calculateTotal={calculateTotal}
          toggleCategory={toggleCategory}
          expandedCategories={expandedCategories}
          categoryGroups={categoryGroups}
          user={user}
          onLogout={handleLogout}
          filters={filters}
          setFilters={setFilters}
        />

        <div className={`flex-1 transition-all duration-300 ${showSidebar ? 'ml-64' : 'ml-0'}`}>
          <div className="pt-20 px-6">
            <HeroSlider
              featuredProducts={featuredProducts}
              currentSlide={currentSlide}
              nextSlide={nextSlide}
              prevSlide={prevSlide}
            />

            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {selectedCategory === 'all' ? 'All Products' : selectedCategory}
                </h2>
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                    <span className="text-sm">Sort By</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-md z-10">
                      <button
                        onClick={() => {
                          setFilters({ ...filters, sort: 'newest' });
                          setShowSortDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Newest First
                      </button>
                      <button
                        onClick={() => {
                          setFilters({ ...filters, sort: 'price-low' });
                          setShowSortDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Price: Low to High
                      </button>
                      <button
                        onClick={() => {
                          setFilters({ ...filters, sort: 'price-high' });
                          setShowSortDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        Price: High to Low
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    toggleWishlist={toggleWishlist}
                    addToCart={addToCart}
                    wishlistItems={wishlistItems}
                    setSelectedProduct={setSelectedProduct}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          addToCart={addToCart}
          toggleWishlist={toggleWishlist}
          wishlistItems={wishlistItems}
        />
      )}

      {showCart && (
        <CartPage
          showCart={showCart}
          setShowCart={setShowCart}
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          calculateTotal={calculateTotal}
          products={products}
        />
      )}

      {showWishlist && (
        <WishlistPage
          showWishlist={showWishlist}
          setShowWishlist={setShowWishlist}
          wishlistItems={wishlistItems}
          toggleWishlist={toggleWishlist}
          addToCart={addToCart}
        />
      )}

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onRegisterClick={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
          onForgotPasswordClick={() => {
            setShowLogin(false);
            setShowForgotPassword(true);
          }}
        />
      )}

      {showRegister && (
        <RegisterForm
          onClose={() => setShowRegister(false)}
          onLoginClick={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}

      {showForgotPassword && (
        <ForgotPasswordForm
          onClose={() => setShowForgotPassword(false)}
          onBackToLogin={() => {
            setShowForgotPassword(false);
            setShowLogin(true);
          }}
        />
      )}

      {showOrders && (
        <OrdersPage
          onClose={() => setShowOrders(false)}
        />
      )}

      {showPayments && (
        <PaymentMethodsPage
          onClose={() => setShowPayments(false)}
        />
      )}

      {showAddresses && (
        <AddressesPage
          onClose={() => setShowAddresses(false)}
        />
      )}

      {showSettings && (
        <SettingsPage
          onClose={() => setShowSettings(false)}
        />
      )}

      {showProfile && (
        <MyProfilePage
          onClose={() => setShowProfile(false)}
        />
      )}

      {showFilters && (
        <FilterPopup
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
    </div>
  );
}

export default AppContent;