import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Grid, List, Filter, Search, ArrowRight, Package, TrendingUp, Star, Eye } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchCategories, fetchProducts } from '../store/slices/productsSlice';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

export const Categories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { categories, products, loading } = useAppSelector((state) => state.products);
  
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter and sort categories
  const filteredCategories = categories
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'products':
          return b.product_count - a.product_count;
        case 'popular':
          // Sort by product count as a proxy for popularity
          return b.product_count - a.product_count;
        default:
          return 0;
      }
    });

  // Get products count for each category
  const getCategoryProductCount = (categoryName) => {
    return products.filter(product => product.category === categoryName).length;
  };

  // Get featured products for a category
  const getCategoryFeaturedProducts = (categoryName) => {
    return products
      .filter(product => product.category === categoryName)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

  // Get average rating for category
  const getCategoryAverageRating = (categoryName) => {
    const categoryProducts = products.filter(product => product.category === categoryName);
    if (categoryProducts.length === 0) return 0;
    const totalRating = categoryProducts.reduce((sum, product) => sum + product.rating, 0);
    return (totalRating / categoryProducts.length).toFixed(1);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.slug}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Shop by Category
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover our carefully curated collection of products organized by category. 
              Find exactly what you're looking for with ease.
            </p>
            <div className="flex items-center justify-center space-x-8 text-blue-100">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5" />
                <span>{categories.length} Categories</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>{products.length} Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="w-full lg:w-96">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="products">Most Products</option>
                <option value="popular">Most Popular</option>
              </select>
              
              {/* View Mode */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden animate-pulse">
                <div className="aspect-video bg-gray-300" />
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-2/3 mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 rounded w-1/3" />
                    <div className="h-8 bg-gray-300 rounded w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Categories Grid/List */}
        {!loading && (
          <>
            {filteredCategories.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                <p className="text-gray-500">Try adjusting your search terms.</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }>
                {filteredCategories.map((category) => {
                  const productCount = getCategoryProductCount(category.name);
                  const featuredProducts = getCategoryFeaturedProducts(category.name);
                  const avgRating = getCategoryAverageRating(category.name);

                  return viewMode === 'grid' ? (
                    // Grid View
                    <div
                      key={category.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 group cursor-pointer"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className="aspect-video overflow-hidden bg-gray-100">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h3>
                          {avgRating > 0 && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm text-gray-600">{avgRating}</span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-4">
                          {productCount} {productCount === 1 ? 'product' : 'products'} available
                        </p>
                        
                        {/* Featured Products Preview */}
                        {featuredProducts.length > 0 && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Featured products:</p>
                            <div className="flex -space-x-2">
                              {featuredProducts.map((product, index) => (
                                <img
                                  key={product.id}
                                  src={product.image}
                                  alt={product.name}
                                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                                  title={product.name}
                                />
                              ))}
                              {productCount > 3 && (
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center">
                                  <span className="text-xs text-gray-600">+{productCount - 3}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-600 font-medium">
                            Explore Category
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div
                      key={category.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group cursor-pointer"
                      onClick={() => handleCategoryClick(category)}
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {category.name}
                            </h3>
                            {avgRating > 0 && (
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">{avgRating}</span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-gray-600 mb-3">
                            {productCount} {productCount === 1 ? 'product' : 'products'} available
                          </p>
                          
                          {/* Featured Products in List View */}
                          {featuredProducts.length > 0 && (
                            <div className="flex items-center gap-4 mb-3">
                              <span className="text-xs text-gray-500">Featured:</span>
                              <div className="flex gap-2">
                                {featuredProducts.slice(0, 2).map((product) => (
                                  <span key={product.id} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                    {product.name.length > 20 ? product.name.substring(0, 20) + '...' : product.name}
                                  </span>
                                ))}
                                {productCount > 2 && (
                                  <span className="text-xs text-gray-500">+{productCount - 2} more</span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategoryClick(category);
                            }}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Category Stats */}
        {!loading && filteredCategories.length > 0 && (
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {filteredCategories.length}
                </div>
                <div className="text-sm text-gray-600">Total Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  {products.length}
                </div>
                <div className="text-sm text-gray-600">Total Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">
                  {products.length > 0 ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1) : '0'}
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Browse all our products or use our advanced search to find exactly what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Browse All Products
                </Button>
              </Link>
              <Link to="/products">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Advanced Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};