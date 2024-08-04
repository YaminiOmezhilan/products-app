// src/redux/productsSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "./store";

// Define the shape of the state
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await axios.get("https://dummyjson.com/products");
  return response.data.products;
});

// Slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

// Selector to access products state
export const selectProducts = (state: RootState) => state.products.products;

export default productsSlice.reducer;
