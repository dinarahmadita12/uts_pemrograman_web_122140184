import React from 'react';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cart, removeFromCart, updateQuantity, toggleSelected } = useStore();
  
  const total = cart
    .filter(item => item.selected)
    .reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-4">Come find your favorite items!</p>
        <Link to="/" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
          <span className="mr-2">&larr;</span> Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tombol Kembali */}
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-600 hover:text-blue-800 flex items-center justify-start"
        >
          <span className="mr-2">&larr;</span> Back to Home
        </Link>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Shopping Cart</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
            <input
              type="checkbox"
              checked={item.selected}
              onChange={() => toggleSelected(item.id)}
              className="mr-4"
            />
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-medium text-gray-800">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="px-2 py-1 border rounded-l"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 py-1 border rounded-r"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-6 flex justify-between items-center">
          <div className="text-lg font-semibold">
            Total: ${total.toFixed(2)}
          </div>
          <Link
            to="/checkout"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
