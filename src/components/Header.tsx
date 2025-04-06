import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, History, LogOut } from 'lucide-react'; 
import { useStore } from '../store/useStore';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);  
  const cart = useStore((state) => state.cart);
  const cartItemCount = cart.length;

  const handleLogout = () => {
    // Hapus status login dari localStorage
    localStorage.removeItem('isLoggedIn');
    // Arahkan ke halaman login setelah logout
    window.location.href = '/login'; 
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-6">  
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-800">Click2Buy</span>
          </Link>

          <button 
            className="lg:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}  
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="hidden lg:flex items-center space-x-6 ml-auto">
            <Link to="/cart" className="relative group text-gray-600 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-600">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-blue-600 text-xs text-white flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            <Link to="/history" className="relative group text-gray-600 hover:text-blue-600">
              <History className="h-6 w-6" />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-600">History</span>
            </Link>

            <Link to="/profile" className="relative group text-gray-600 hover:text-blue-600">
              <User className="h-6 w-6" />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-600">Profile</span>
            </Link>

            <button onClick={handleLogout} className="relative group text-gray-600 hover:text-blue-600">
              <LogOut className="h-6 w-6" />
              <span className="absolute left-1/2 transform -translate-x-1/2 top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-gray-600">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="flex flex-col items-center space-y-4 bg-gray-100 lg:hidden py-4">
          <Link to="/cart" className="text-gray-600 hover:text-blue-600">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              <span className="text-sm text-gray-600">Cart</span>
            </div>
          </Link>
          <Link to="/history" className="text-gray-600 hover:text-blue-600">
            <div className="flex items-center space-x-2">
              <History className="h-6 w-6 text-gray-600" />
              <span className="text-sm text-gray-600">History</span>
            </div>
          </Link>
          <Link to="/profile" className="text-gray-600 hover:text-blue-600">
            <div className="flex items-center space-x-2">
              <User className="h-6 w-6 text-gray-600" />
              <span className="text-sm text-gray-600">Profile</span>
            </div>
          </Link>
          <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600">
            <div className="flex items-center space-x-2">
              <LogOut className="h-6 w-6 text-gray-600" />
              <span className="text-sm text-gray-600">Logout</span>
            </div>
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
