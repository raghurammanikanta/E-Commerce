import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAppDispatch } from '../../hooks/redux';
import { addToCart } from '../../store/slices/cartSlice';
import toast from 'react-hot-toast';

export const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success('Added to cart!');
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-indigo-300">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition-colors">
              {product.name}
            </h3>
            <span className="text-sm text-gray-500 bg-indigo-50 px-2 py-1 rounded">
              {product.brand}
            </span>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600 ml-1">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className={`text-xs ${product.stock > 0 ? 'text-teal-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="ml-2"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};