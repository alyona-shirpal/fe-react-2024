import type { Category } from '@/types/interfaces/Category.ts';

export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
    category: Category;
}
