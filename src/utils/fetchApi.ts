import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { API_URL } from '@/assets/constants/common.ts';
import type { Product } from '@/types/interfaces/Product.ts';

export const fetchApi = async (): Promise<Product[]> => {
    try {
        const response: AxiosResponse<Product[]> = await axios.get(API_URL);

        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
