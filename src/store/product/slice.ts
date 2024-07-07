import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Product } from '@/types/interfaces/Product.ts';

interface ProductsState {
    product: Product | null;
    error: string | null;
}

const initialState: ProductsState = {
    product: null,
    error: null,
};

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProduct: (state, action: PayloadAction<Product>) => {
            state.product = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setProduct, setError } = productSlice.actions;

export const productReducer = productSlice.reducer;
