import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
            <div className="aspect-square bg-indigo-200" />
            <div className="p-4">
              <div className="h-4 bg-indigo-200 rounded mb-2" />
              <div className="h-3 bg-indigo-200 rounded mb-3" />
              <div className="h-3 bg-indigo-200 rounded w-1/2 mb-3" />
              <div className="flex justify-between items-center">
                <div className="h-4 bg-indigo-200 rounded w-1/3" />
                <div className="h-8 bg-teal-200 rounded w-16" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No products found.</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};