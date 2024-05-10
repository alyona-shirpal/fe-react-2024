import React from 'react';

import { Card } from '@/components/card/card.tsx';
import type { Product } from '@/types/interfaces/Product.ts';

import products from '../../../tempCards.json';

import styles from './productList.module.css';

interface ProductProps {
    updateTotalCart: () => void;
}

export const ProductList: React.FC<ProductProps> = ({ updateTotalCart }) => (
    <div className={styles.mainGridWrapper}>
        <div className={styles.grid}>
            {products.map((item: Product) => (
                <Card key={item.id} product={item} onCartChange={updateTotalCart} />
            ))}
        </div>
    </div>
);
