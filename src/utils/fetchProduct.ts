import { ApiService } from '@/services/axios.service.ts';
import type { ProductResponse } from '@/types/interfaces/Product.ts';

export const fetchProductFnct = async (
    currentPage: number,
    limit: number,
    searchTerm: string,
    category: number,
    activeFilter: string,
): Promise<ProductResponse> => {
    const offset = (currentPage - 1) * limit;

    const parameters = new URLSearchParams({
        categoryId: category.toString(),
        limit: limit.toString(),
        offset: offset.toString(),
    });

    if (searchTerm) {
        parameters.append('title', searchTerm);
    }

    if (activeFilter) {
        if (activeFilter === 'price-asc') {
            parameters.append('sortOrder', 'asc');
            parameters.append('price-min', '0');
        } else if (activeFilter === 'price-desc') {
            parameters.append('sortOrder', 'desc');
            parameters.append('price-min', '9999999');
        }
    }
    const url = `v1/products/?${parameters.toString()}`;

    return await ApiService.getInstance().get<ProductResponse>(url);
};
