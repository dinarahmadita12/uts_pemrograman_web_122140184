import React from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useStore } from '../store/useStore';
import LoadingSpinner from '../components/LoadingSpinner';
import type { Product, CartItem } from '../types';  

function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useStore();

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  
  if (error) return <div className="text-red-600">Error loading product</div>;
  
  if (!product) return <div>Product not found</div>;

  const handleCheckoutDirectly = () => {
    const cartItem: CartItem = {
      ...product,    
      quantity: 1,   
      selected: true, 
    };
    addToCart(cartItem);  
    navigate('/checkout');  
  };

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:text-blue-800 flex items-center"
      >
        ← Back
      </button>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="max-w-full h-auto object-contain"
            />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-yellow-400">★</span>
                <span className="ml-1">{product.rating.rate}</span>
                <span className="ml-2 text-gray-500">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>
            
            <button
              onClick={() => {
                // Add product to cart
                const cartItem: CartItem = {
                  ...product,
                  quantity: 1, // Default quantity is 1
                  selected: true, // Mark the item as selected
                };
                addToCart(cartItem);
              }}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors mb-4"
            >
              Add to Cart
            </button>
            
            {/* Tombol untuk langsung checkout */}
            <button
              onClick={handleCheckoutDirectly}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors"
            >
              Checkout Directly
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
