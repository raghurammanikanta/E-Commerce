import React, { useEffect, useState } from 'react';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts, setFilters } from '../store/slices/productsSlice';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Products = () => {
  const dispatch = useAppDispatch();
  const { products, loading, filters } = useAppSelector((state) => state.products);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                         product.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesBrand = !filters.brand || product.brand === filters.brand;
    const matchesPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const categories = Array.from(new Set(products.map(p => p.category)));
  const brands = Array.from(new Set(products.map(p => p.brand)));

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Products</h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="w-full sm:w-96">
              <Input
                type="text"
                placeholder="Search products..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="border-amber-300 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            
            {/* Sort & Filter Controls */}
            <div className="flex items-center gap-4">
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
              
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden border-amber-600 text-amber-700 hover:bg-amber-100"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`
            ${showFilters ? 'block' : 'hidden'} lg:block
            w-full lg:w-64 space-y-6
          `}>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-amber-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-amber-400 hover:text-amber-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Category Filter */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-amber-800">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              {/* Brand Filter */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-amber-800">Brand</label>
                <select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">All Brands</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
              
              {/* Price Range */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-amber-800">Price Range</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange('minPrice', Number(e.target.value))}
                    className="border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', Number(e.target.value))}
                    className="border-amber-300 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4">
              <p className="text-amber-800">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>
            <ProductGrid products={sortedProducts} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};