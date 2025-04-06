import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { useNavigate } from 'react-router-dom';
import type { OrderHistory } from '../types'; 

function HistoryPage() {
  const { orderHistory, cancelOrder, addOrder } = useStore();
  const navigate = useNavigate();

  const [statusUpdate, setStatusUpdate] = useState<Map<string, string>>(new Map());

  const handleBack = () => {
    navigate('/');
  };

  const handleCancel = (orderId: string) => {
    cancelOrder(orderId);
  };

  // Cek data yang disimpan di localStorage 
  useEffect(() => {
    const storedOrderHistory = localStorage.getItem('orderHistory');
    if (storedOrderHistory) {
      const parsedHistory: OrderHistory[] = JSON.parse(storedOrderHistory);
      
      parsedHistory.forEach((order) => {
        if (!orderHistory.find(existingOrder => existingOrder.id === order.id)) {
          addOrder(order); 
        }
      });
    }

    orderHistory.forEach((order) => {
      if (order.status === 'pending' && !statusUpdate.has(order.id)) {
        setTimeout(() => {
          setStatusUpdate((prev) => new Map(prev).set(order.id, 'completed'));
        }, 3000); 
      }
    });
  }, [orderHistory, addOrder, statusUpdate]); 

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  if (orderHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No order history</h2>
        <p className="text-gray-600">You haven't made any orders yet.</p>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back
          </button>
          <button
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span className="mr-2">→</span> Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span className="mr-2">&larr;</span> Back
          </button>
          <button
            onClick={handleBack}
            className="text-blue-600 hover:text-blue-800 flex items-center"
          >
            <span className="mr-2">→</span> Continue Shopping
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order History</h2>
      <div className="space-y-6">
        {orderHistory.map((order: OrderHistory) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  Order #{order.id}
                </h3>
                <p className="text-gray-600">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  statusUpdate.get(order.id) === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : order.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}
              >
                {statusUpdate.get(order.id) === 'completed'
                  ? 'Completed'
                  : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="border-t border-gray-200 pt-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-contain mr-4"
                    />
                    <span>{item.title}</span>
                  </div>
                  <div className="text-right">
                    <div>${item.price} x {item.quantity}</div>
                    <div className="text-gray-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">${order.total.toFixed(2)}</span>
              </div>
            </div>

            {(order.status === 'completed' || order.status === 'pending') && statusUpdate.get(order.id) !== 'completed' && (
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleCancel(order.id)}
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryPage;
