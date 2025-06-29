import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { signOut } from '../../store/slices/authSlice';
import { Button } from '../ui/Button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile } = useAppSelector((state) => state.auth);
  const { itemCount } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/');
  };

  // Get display name from profile or user data
  const displayName = profile?.name || user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-semibold text-gray-900">ClickStore</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Products
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
              Categories
            </Link>
            
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-5">
                <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group">
                  <div className="p-1.5 bg-gray-100 rounded-full group-hover:bg-blue-50 transition-colors">
                    <User className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                  </div>
                  <span className="hidden lg:inline font-medium">{displayName}</span>
                </Link>
                <Button variant="outline" size="sm" onClick={handleSignOut} className="rounded-lg">
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin">
                  <Button variant="ghost" size="sm" className="rounded-lg">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="rounded-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
          <div className="px-4 py-3 space-y-3">
            {/* Search Bar - Mobile */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <Link
              to="/products"
              className="block py-2.5 px-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="block py-2.5 px-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200"
            >
              Categories
            </Link>
            <Link
              to="/cart"
              className="flex items-center py-2.5 px-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5 mr-2.5" />
              Cart ({itemCount})
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="flex items-center py-2.5 px-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-200"
                >
                  <User className="w-5 h-5 mr-2.5" />
                  {displayName}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left py-2.5 px-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <Link to="/signin">
                  <Button variant="ghost" size="sm" className="w-full rounded-lg">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="w-full rounded-lg">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};