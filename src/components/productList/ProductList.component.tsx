import React from 'react';

import { Card } from '@/components/card/Card.component.tsx';
import type { Product } from '@/types/interfaces/Product.ts';

import styles from './productList.module.css';

interface ProductProps {
    products: Product[];
}

export const ProductList: React.FC<ProductProps> = ({ products }) => (
    <div className={styles.mainGridWrapper}>
        <div className={styles.grid}>
            {products.map((item: Product) => (
                <Card key={item.id} product={item} />
            ))}
        </div>
    </div>
);
