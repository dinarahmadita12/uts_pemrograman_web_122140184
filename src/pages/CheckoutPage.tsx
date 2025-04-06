import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { CheckoutForm } from '../types';  

function CheckoutPage() {
  const navigate = useNavigate();
  const { user, cart, clearCart, addOrder } = useStore();  
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      address: user?.address || '',
      phone: user?.phone || '',
      paymentMethod: 'credit'  
    }
  });

  const selectedItems = cart.filter(item => item.selected);
  const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onSubmit = () => {
    const order = {
      id: Math.random().toString(36).substr(2, 9),  
      date: new Date().toISOString(),
      items: selectedItems,
      total,
      status: 'pending' as const,  
    };

    addOrder(order);  
    clearCart();  
    navigate('/history');  
  };

  const handleBack = () => {
    navigate('/cart'); 
  };

  if (selectedItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No items selected for checkout</h2>
        <button
          onClick={() => navigate('/cart')}
          className="text-blue-600 hover:text-blue-800"
        >
          Return to Cart
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-4">
        <button
          onClick={handleBack}
          className="text-blue-600 hover:text-blue-800 flex items-center"
        >
          <span className="mr-2">&larr;</span> Back
        </button>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Checkout</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                {...register('address', { required: 'Address is required' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                {...register('phone', { required: 'Phone is required' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Payment Method</label>
              <select
                {...register('paymentMethod', { required: 'Payment method is required' })}
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
              {errors.paymentMethod && <p className="mt-1 text-sm text-red-600">{errors.paymentMethod.message}</p>}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Order Summary</h3>
          {selectedItems.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>{item.title} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            type="button"
            onClick={handleBack}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}

export default CheckoutPage;
