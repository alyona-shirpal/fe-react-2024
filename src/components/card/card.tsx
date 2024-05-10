import React, { useEffect, useState } from 'react';

import { CartIcon } from '@/assets/icons/Cart.tsx';
import type { Product } from '@/types/interfaces/Product.ts';

import styles from './card.module.css';

interface CardProps {
    product: Product;
    onCartChange: () => void;
}

export const Card: React.FC<CardProps> = ({ product, onCartChange }) => {
    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem(`cartCount-${product.id}`);
        return savedCount ? Number.parseInt(savedCount, 10) : 0;
    });

    useEffect(() => {
        localStorage.setItem(`cartCount-${product.id}`, count.toString());
        onCartChange();
    }, [count, product.id, onCartChange]);

    const handleCartClick = () => {
        setCount((previousCount) => (previousCount === 1 ? 0 : 1));
    };

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
                {count > 0 && <div className={styles.counter}>{count}</div>}
            </div>
        </div>
    );
};
