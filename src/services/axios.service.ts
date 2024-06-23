import { toast } from 'react-toastify';

import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { API_URL } from '@/constants/common.ts';

export class ApiService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private static instance: ApiService;

    private baseUrl = API_URL;

    private constructor() {
        axios.defaults.baseURL = this.baseUrl;
        axios.interceptors.response.use(
            (response) => response,
            (error) => {
                toast.error(error.message);
                return Promise.reject(error);
            },
        );
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    public static getInstance(): ApiService {
        if (!ApiService.instance) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    public async get<T>(url: string): Promise<T> {
        const response: AxiosResponse = await axios.get(url);

        return response.data as T;
    }
}
