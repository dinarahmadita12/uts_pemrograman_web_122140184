import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import type { Product } from '../types';

function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const { data: products, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    },
  });

  const { data: categories } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get('https://fakestoreapi.com/products/categories');
      return response.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  
  if (error) return <div className="text-red-600">Error loading products</div>;

  const filteredProducts = products?.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <div className="mb-8 space-y-6">
        <SearchBar onSearch={setSearchQuery} />
        {categories && (
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts?.length === 0 && (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No products found</h2>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;