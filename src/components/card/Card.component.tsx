import React from 'react';
import { useNavigate } from 'react-router-dom';

import { CartIcon } from '@/assets/icons/Cart.tsx';
import { useCart } from '@/contexts/CartContextProvider.tsx';
import type { Product } from '@/types/interfaces/Product.ts';

import styles from './card.module.css';

interface CardProps {
    product: Product;
}

export const Card: React.FC<CardProps> = ({ product }) => {
    const cart = useCart();
    const { quantity } = cart.getCartItemBySku(product.id);

    const navigate = useNavigate();

    const handleCartClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        cart.toggleItem(product.id);
    };

    const handleCardClick = () => {
        navigate(`/products/${product.id}`);
    };

    return (
        <div className={styles.cardWrapper} onClick={handleCardClick}>
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
                {quantity > 0 && <div className={styles.counter}>{quantity}</div>}
            </div>
        </div>
    );
};
