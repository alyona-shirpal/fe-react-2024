import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Product, ProductResponse } from '@/types/interfaces/Product.ts';

interface ProductsState {
    productList: Product[];
    isLoading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
}

const initialState: ProductsState = {
    productList: [],
    isLoading: true,
    error: null,
    totalPages: 0,
    currentPage: 1,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<ProductResponse>) => {
            state.productList = action.payload.products;
            state.totalPages = Math.ceil(action.payload.total / 8);
            state.isLoading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
    },
});

export const { setProducts, setLoading, setError, setCurrentPage } = productsSlice.actions;

export const productsReducer = productsSlice.reducer;
