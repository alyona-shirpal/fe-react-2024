import type { Product } from '@/types/interfaces/Product.ts';

export const getPaginatedProducts = (productData: Product[], currentPage: number): Product[] =>
    productData.slice((currentPage - 1) * 8, currentPage * 8);
