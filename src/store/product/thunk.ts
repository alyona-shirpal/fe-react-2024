import { createAsyncThunk } from '@reduxjs/toolkit';

import { ApiService } from '@/services/axios.service.ts';
import { setProduct } from '@/store/product/slice.ts';
import { setError } from '@/store/products/slice.ts';
import type { Product } from '@/types/interfaces/Product.ts';

export const getProductByIdThunk = createAsyncThunk(
    'products/getProduct',
    async ({ id }: { id: string }, { rejectWithValue, dispatch }) => {
        try {
            const fetchedProduct: Product = await ApiService.getInstance().get(`v1/products/${id}`);
            dispatch(setProduct(fetchedProduct));
            return fetchedProduct;
        } catch (error: any) {
            const errorMessage = error.response?.data || 'Failed to fetch product';
            dispatch(setError(errorMessage));
            return rejectWithValue(errorMessage);
        }
    },
);
