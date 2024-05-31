import React, { useEffect, useState } from 'react';

import { CartIcon } from '@/assets/icons/Cart.tsx';
import type { Product } from '@/types/interfaces/Product.ts';

import styles from './Card.module.css';

interface CardProps {
    product: Product;
    onCartChange: () => void;
}

export const Card: React.FC<CardProps> = ({ product, onCartChange }) => {
    const initialProductIds = localStorage.getItem('cartIds');
    const [productIds, setProductIds] = useState<string[]>(initialProductIds ? JSON.parse(initialProductIds) : []);

    const isInCart = productIds.includes(product.id.toString());

    const handleCartClick = () => {
        const inCart = initialProductIds ? JSON.parse(initialProductIds) : [];
        const updatedCartIds = isInCart ? inCart?.filter((id: string) => id !== product.id.toString()) : [...inCart, product.id.toString()];

        localStorage.setItem('cartIds', JSON.stringify(updatedCartIds));
        setProductIds(updatedCartIds);
    };

    useEffect(() => {
        onCartChange();
    }, [productIds, onCartChange]);

    return (
        <div className={styles.cardWrapper}>
            <img className={styles.cardImage} src={product.images[0]} alt="product" />
            <div className={styles.cardTitle}>{product.title}</div>
            <div className={styles.cardPriceBlock}>
                <div className={styles.priceWrap}>
                    <div className={styles.cardPrice}>{product.price}</div>
                    <p className={styles.hryvna}>₴</p>
                </div>
                <button onClick={handleCartClick} className={styles.cardIcon}>
                    <CartIcon />
                </button>
                {isInCart && <div className={styles.counter}>1</div>}
            </div>
        </div>
    );
};
