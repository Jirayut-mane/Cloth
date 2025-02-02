import React from 'react';
import { ShoppingCart, User, Search, Heart, Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface NavbarProps {
  showSidebar: boolean;
  setShowSidebar: (show: boolean) => void;
  setShowLogin: (show: boolean) => void;
  setShowCart: (show: boolean) => void;
  setShowWishlist: (show: boolean) => void;
  cartItemsCount: number;
  wishlistItemsCount: number;
  user: any;
}

const Navbar: React.FC<NavbarProps> = ({
  showSidebar,
  setShowSidebar,
  setShowLogin,
  setShowCart,
  setShowWishlist,
  cartItemsCount,
  wishlistItemsCount,
  user,
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className={`${isDark ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md px-6 py-4 fixed w-full top-0 z-50`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold text-indigo-600">StyleStore</h1>
        </div>
        <div className="relative flex-1 max-w-md mx-12">
          <input
            type="text"
            placeholder="Search products..."
            className={`w-full pl-10 pr-4 py-2 border rounded-lg ${
              isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'
            }`}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          <button
            onClick={() => user ? setShowWishlist(true) : setShowLogin(true)}
            className={`p-2 rounded-full relative ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <Heart className="w-6 h-6" />
            {wishlistItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistItemsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => user ? setShowCart(true) : setShowLogin(true)}
            className={`p-2 rounded-full relative ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <ShoppingCart className="w-6 h-6" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => !user && setShowLogin(true)}
            className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
