import type { CartItem } from '@/contexts/CartContextProvider.tsx';

export const findCartQuantity = (cart: CartItem[]) => cart.reduce((accumulator, it) => accumulator + it.quantity, 0);
