import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ userId, items, shippingAddress, paymentMethod }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const order = {
      id: `order_${Date.now()}`,
      user_id: userId,
      items: items.map(item => ({
        id: `item_${Date.now()}_${item.product.id}`,
        product_id: item.product.id,
        product: item.product,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total,
      status: 'pending',
      shipping_address: shippingAddress,
      payment_method: paymentMethod,
      payment_status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    
    return order;
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async (userId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    return []; // Return empty array for now
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.currentOrder = action.payload;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create order';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  },
});

export const { clearCurrentOrder } = ordersSlice.actions;
export default ordersSlice.reducer;