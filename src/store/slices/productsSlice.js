import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockProducts, mockCategories } from '../../lib/mockData';

const initialState = {
  products: [],
  categories: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    brand: '',
    minPrice: 0,
    maxPrice: 10000,
    search: '',
    sortBy: 'name',
  },
};

// Use mock data for immediate development
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockProducts;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCategories;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export const { setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;