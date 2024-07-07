import { configureStore } from '@reduxjs/toolkit';

import { productReducer } from '@/store/product/slice.ts';
import { productsReducer } from '@/store/products/slice.ts';
import { themeReducer } from '@/store/theme/slice.ts';

const reducer = {
    products: productsReducer,
    product: productReducer,
    theme: themeReducer,
};

export const store = configureStore({ reducer });

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const selectProductList = (state: RootState) => state.products.productList;
export const selectIsLoading = (state: RootState) => state.products.isLoading;
export const selectTotalPages = (state: RootState) => state.products.totalPages;

export const selectCurrentPage = (state: RootState) => state.products.currentPage;

export const selectProduct = (state: RootState) => state.product;

export const selectTheme = (state: RootState) => state.theme;
