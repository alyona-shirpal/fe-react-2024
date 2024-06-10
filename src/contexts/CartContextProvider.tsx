import type { ReactNode } from 'react';
import React, { createContext, useContext } from 'react';

import { CART_STORAGE_KEY } from '@/constants/common.ts';

export interface CartItem {
    productId: number;
    quantity: number;
}
export interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    toggleItem: (productId: number) => void;
    getCartItemBySku: (productId: number) => CartItem;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cart, setCart] = React.useState<CartItem[]>(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) ?? '[]'));

    React.useEffect(() => {
        const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    React.useEffect(() => {
        window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);

    const toggleItem = (sku: number) => {
        setCart((previousCart) =>
            previousCart.map((item) => item.productId).includes(sku)
                ? previousCart.filter((item) => item.productId !== sku)
                : [...previousCart, { productId: sku, quantity: 1 }],
        );
    };

    const addToCart = (item: CartItem) => {
        setCart((previousCart) => {
            const existingItem = previousCart.find((cartItem) => cartItem.productId === item.productId);
            if (existingItem) {
                return previousCart.map((cartItem) =>
                    cartItem.productId === item.productId ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem,
                );
            }
            return [...previousCart, item];
        });
    };

    const removeFromCart = (sku: number) => {
        setCart((previousCart) => previousCart.filter((cartItem) => cartItem.productId !== sku));
    };

    const updateQuantity = (sku: number, quantity: number) => {
        setCart((previousCart) => previousCart.map((cartItem) => (cartItem.productId === sku ? { ...cartItem, quantity } : cartItem)));
    };

    const getCartItemBySku = (sku: number): CartItem =>
        cart.find((cartItem) => cartItem.productId === sku) ?? { productId: sku, quantity: 0 };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, toggleItem, getCartItemBySku }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
