import { createAsyncThunk } from '@reduxjs/toolkit';

import { setCurrentPage, setError, setLoading, setProducts } from '@/store/products/slice.ts';
import type { ProductResponse } from '@/types/interfaces/Product.ts';
import { fetchProductFnct } from '@/utils/fetchProduct.ts';

export const getProductsThunk = createAsyncThunk<
    ProductResponse,
    {
        currentPage: number;
        limit: number;
        searchTerm: string;
        category: number;
        activeFilter: string;
    }
>('products/getProducts', async ({ currentPage, limit, searchTerm, category, activeFilter }, { rejectWithValue, dispatch }) => {
    try {
        dispatch(setLoading(true));
        dispatch(setCurrentPage(currentPage));
        const productData = await fetchProductFnct(currentPage, limit, searchTerm, category, activeFilter);
        dispatch(setProducts(productData));
        return productData;
    } catch (error: any) {
        const errorMessage = error.response?.data || 'Failed to fetch products';
        dispatch(setError(errorMessage));
        return rejectWithValue(errorMessage);
    }
});
