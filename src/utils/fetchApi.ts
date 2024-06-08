import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { API_URL } from '@/constants/common.ts';
import type { Product } from '@/types/interfaces/Product.ts';

export const fetchApi = async (): Promise<Product[]> => {
    try {
        const response: AxiosResponse<Product[]> = await axios.get(API_URL);

        return response.data;
    } catch (error) {
        throw new Error(`Error fetching data: ${error}`);
    }
};

export const fetchProduct = async (id: string): Promise<Product> => {
    try {
        const response: AxiosResponse<Product> = await axios.get(`${API_URL}/${id}`);

        return response.data;
    } catch (error) {
        throw new Error(`Error fetching product: ${error}`);
    }
};
